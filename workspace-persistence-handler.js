// Workspace Persistence Handler
// Implements auto-save functionality and analysis result persistence

class WorkspacePersistenceHandler {
    constructor() {
        this.saveTimeout = null;
        this.isDirty = false;
        this.currentSubcomponentId = null;
        this.autoSaveInterval = 1000; // Auto-save after 1 second of inactivity
        this.lastSavedData = null;
        
        console.log('💾 Workspace Persistence Handler initialized');
        this.init();
    }

    // Initialize the persistence system
    init() {
        // Set up auto-save for all worksheet fields
        this.setupAutoSave();
        
        // Set up analysis persistence
        this.setupAnalysisPersistence();
        
        // Add save status indicator to UI
        this.addSaveStatusIndicator();
        
        // Load any saved data on page load
        this.loadSavedWorkspace();
        
        console.log('✅ Persistence system ready');
    }

    // Set up auto-save functionality for workspace fields
    setupAutoSave() {
        // Find all worksheet input fields
        const worksheetFields = document.querySelectorAll('.worksheet-field, textarea[id*="worksheet"], input[id*="worksheet"]');
        
        worksheetFields.forEach(field => {
            // Add input event listener for auto-save
            field.addEventListener('input', () => {
                this.markAsDirty();
                this.scheduleAutoSave();
            });
            
            // Add blur event for immediate save
            field.addEventListener('blur', () => {
                if (this.isDirty) {
                    this.saveWorkspaceData();
                }
            });
        });
        
        // Also save before page unload
        window.addEventListener('beforeunload', (e) => {
            if (this.isDirty) {
                this.saveWorkspaceData();
                e.preventDefault();
                e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
            }
        });
    }

    // Mark workspace as having unsaved changes
    markAsDirty() {
        this.isDirty = true;
        this.updateSaveStatus('unsaved');
    }

    // Schedule auto-save after user stops typing
    scheduleAutoSave() {
        // Clear existing timeout
        if (this.saveTimeout) {
            clearTimeout(this.saveTimeout);
        }
        
        // Schedule new save
        this.saveTimeout = setTimeout(() => {
            this.saveWorkspaceData();
        }, this.autoSaveInterval);
    }

    // Save workspace data to server and local storage
    async saveWorkspaceData() {
        try {
            this.updateSaveStatus('saving');
            
            // Collect all worksheet data
            const data = this.collectWorksheetData();
            
            // Check if data has actually changed
            if (JSON.stringify(data) === JSON.stringify(this.lastSavedData)) {
                this.isDirty = false;
                this.updateSaveStatus('saved');
                return;
            }
            
            // Save to local storage immediately
            this.saveToLocalStorage(data);
            
            // Get current subcomponent ID
            const subcomponentId = this.getCurrentSubcomponentId();
            
            // Save to server
            const response = await fetch('/api/workspace/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    subcomponentId: subcomponentId,
                    data: data,
                    timestamp: new Date().toISOString()
                })
            });
            
            if (response.ok) {
                this.isDirty = false;
                this.lastSavedData = data;
                this.updateSaveStatus('saved');
                console.log('✅ Workspace data saved successfully');
            } else {
                throw new Error('Failed to save to server');
            }
            
        } catch (error) {
            console.error('❌ Error saving workspace data:', error);
            this.updateSaveStatus('error');
            
            // Even if server save fails, we have local storage backup
            this.showNotification('Changes saved locally. Will sync when connection restored.', 'warning');
        }
    }

    // Collect all worksheet data from the form
    collectWorksheetData() {
        const data = {};
        
        // Standard worksheet field IDs
        const fieldIds = [
            'worksheet-who-affected',
            'worksheet-what-problem',
            'worksheet-when-occur',
            'worksheet-what-impact',
            'worksheet-how-solving',
            'worksheet-evidence-validation'
        ];
        
        fieldIds.forEach(id => {
            const field = document.getElementById(id);
            if (field) {
                data[id.replace('worksheet-', '')] = field.value;
            }
        });
        
        // Also check for any other worksheet fields
        document.querySelectorAll('[id^="worksheet-"]').forEach(field => {
            const key = field.id.replace('worksheet-', '');
            if (!data[key]) {
                data[key] = field.value;
            }
        });
        
        return data;
    }

    // Save data to local storage
    saveToLocalStorage(data) {
        const subcomponentId = this.getCurrentSubcomponentId();
        const storageKey = `workspace_${subcomponentId}`;
        
        localStorage.setItem(storageKey, JSON.stringify({
            data: data,
            timestamp: new Date().toISOString(),
            subcomponentId: subcomponentId
        }));
    }

    // Load saved workspace data
    async loadSavedWorkspace() {
        try {
            const subcomponentId = this.getCurrentSubcomponentId();
            
            // First try to load from server
            const response = await fetch(`/api/workspace/load/${subcomponentId}`);
            
            let savedData = null;
            
            if (response.ok) {
                const serverData = await response.json();
                savedData = serverData.data;
            } else {
                // Fallback to local storage
                const storageKey = `workspace_${subcomponentId}`;
                const localData = localStorage.getItem(storageKey);
                
                if (localData) {
                    const parsed = JSON.parse(localData);
                    savedData = parsed.data;
                    console.log('📂 Loaded workspace from local storage');
                }
            }
            
            // Populate fields with saved data
            if (savedData) {
                this.populateWorksheetFields(savedData);
                this.lastSavedData = savedData;
                this.updateSaveStatus('saved');
            }
            
        } catch (error) {
            console.error('Error loading saved workspace:', error);
        }
    }

    // Populate worksheet fields with saved data
    populateWorksheetFields(data) {
        Object.entries(data).forEach(([key, value]) => {
            const field = document.getElementById(`worksheet-${key}`);
            if (field) {
                field.value = value;
            }
        });
    }

    // Get current subcomponent ID
    getCurrentSubcomponentId() {
        // Try multiple methods to get the ID
        
        // Method 1: From URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const urlId = urlParams.get('id');
        if (urlId) return urlId;
        
        // Method 2: From global variable
        if (window.currentSubcomponentId) return window.currentSubcomponentId;
        
        // Method 3: From data attribute
        const container = document.querySelector('[data-subcomponent-id]');
        if (container) return container.dataset.subcomponentId;
        
        // Default fallback
        return '1-1';
    }

    // Set up analysis persistence
    setupAnalysisPersistence() {
        // Override the analysis tab click handler
        const analysisTab = document.querySelector('[data-tab="analysis"]');
        if (analysisTab) {
            analysisTab.addEventListener('click', async (e) => {
                // Load saved analysis if it exists
                await this.loadSavedAnalysis();
            });
        }
        
        // Save analysis results when they're generated
        this.interceptAnalysisResults();
    }

    // Intercept and save analysis results
    interceptAnalysisResults() {
        // Override the global display function to save results
        const originalDisplay = window.displayAnalysisResults || window.displayEnhancedAnalysis;
        
        if (originalDisplay) {
            window.displayAnalysisResults = (results) => {
                // Call original display function
                originalDisplay(results);
                
                // Save the results
                this.saveAnalysisResults(results);
            };
        }
    }

    // Save analysis results
    async saveAnalysisResults(results) {
        try {
            const subcomponentId = this.getCurrentSubcomponentId();
            
            // Save to local storage
            localStorage.setItem(`analysis_${subcomponentId}`, JSON.stringify({
                results: results,
                timestamp: new Date().toISOString()
            }));
            
            // Save to server
            await fetch('/api/analysis/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    subcomponentId: subcomponentId,
                    results: results,
                    timestamp: new Date().toISOString()
                })
            });
            
            console.log('✅ Analysis results saved');
            this.showNotification('Analysis saved successfully', 'success');
            
        } catch (error) {
            console.error('Error saving analysis results:', error);
        }
    }

    // Load saved analysis results
    async loadSavedAnalysis() {
        try {
            const subcomponentId = this.getCurrentSubcomponentId();
            
            // Check if we already have analysis displayed
            const analysisContainer = document.querySelector('.analysis-results-container');
            if (analysisContainer && analysisContainer.children.length > 0) {
                return; // Analysis already displayed
            }
            
            // Try to load from server first
            const response = await fetch(`/api/analysis/load/${subcomponentId}`);
            
            let savedAnalysis = null;
            
            if (response.ok) {
                const serverData = await response.json();
                savedAnalysis = serverData.results;
            } else {
                // Fallback to local storage
                const localData = localStorage.getItem(`analysis_${subcomponentId}`);
                if (localData) {
                    const parsed = JSON.parse(localData);
                    savedAnalysis = parsed.results;
                }
            }
            
            // Display saved analysis if found
            if (savedAnalysis) {
                const displayFunction = window.displayAnalysisResults || window.displayEnhancedAnalysis;
                if (displayFunction) {
                    displayFunction(savedAnalysis);
                    this.showNotification('Previous analysis loaded', 'info');
                }
            } else {
                this.showNotification('No saved analysis found. Complete the workspace to generate analysis.', 'info');
            }
            
        } catch (error) {
            console.error('Error loading saved analysis:', error);
        }
    }

    // Add save status indicator to UI
    addSaveStatusIndicator() {
        // Check if indicator already exists
        if (document.getElementById('save-status-indicator')) return;
        
        // Create status indicator
        const indicator = document.createElement('div');
        indicator.id = 'save-status-indicator';
        indicator.className = 'save-status-indicator';
        indicator.innerHTML = `
            <span class="status-icon"></span>
            <span class="status-text">All changes saved</span>
        `;
        
        // Add styles
        const styles = `
            <style>
                .save-status-indicator {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    background: rgba(0, 0, 0, 0.8);
                    color: white;
                    padding: 10px 15px;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    font-size: 14px;
                    z-index: 10000;
                    transition: all 0.3s ease;
                }
                
                .save-status-indicator.saving .status-icon::before {
                    content: "⏳";
                    animation: spin 1s linear infinite;
                }
                
                .save-status-indicator.saved .status-icon::before {
                    content: "✅";
                }
                
                .save-status-indicator.unsaved .status-icon::before {
                    content: "💾";
                }
                
                .save-status-indicator.error .status-icon::before {
                    content: "❌";
                }
                
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                
                .notification-toast {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: rgba(0, 0, 0, 0.9);
                    color: white;
                    padding: 15px 20px;
                    border-radius: 8px;
                    z-index: 10001;
                    animation: slideIn 0.3s ease;
                }
                
                .notification-toast.success {
                    border-left: 4px solid #22c55e;
                }
                
                .notification-toast.warning {
                    border-left: 4px solid #f59e0b;
                }
                
                .notification-toast.error {
                    border-left: 4px solid #ef4444;
                }
                
                .notification-toast.info {
                    border-left: 4px solid #3b82f6;
                }
                
                @keyframes slideIn {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
            </style>
        `;
        
        // Add styles if not already present
        if (!document.getElementById('persistence-styles')) {
            const styleElement = document.createElement('div');
            styleElement.id = 'persistence-styles';
            styleElement.innerHTML = styles;
            document.head.appendChild(styleElement);
        }
        
        // Add indicator to page
        document.body.appendChild(indicator);
    }

    // Update save status indicator
    updateSaveStatus(status) {
        const indicator = document.getElementById('save-status-indicator');
        if (!indicator) return;
        
        // Remove all status classes
        indicator.className = 'save-status-indicator';
        
        // Add new status class
        indicator.classList.add(status);
        
        // Update text
        const statusText = indicator.querySelector('.status-text');
        const messages = {
            'saving': 'Saving changes...',
            'saved': 'All changes saved',
            'unsaved': 'Unsaved changes',
            'error': 'Error saving changes'
        };
        
        statusText.textContent = messages[status] || 'Ready';
    }

    // Show notification toast
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification-toast ${type}`;
        notification.textContent = message;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
}

// Auto-initialize when DOM is ready
if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.workspacePersistence = new WorkspacePersistenceHandler();
        });
    } else {
        window.workspacePersistence = new WorkspacePersistenceHandler();
    }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WorkspacePersistenceHandler;
}
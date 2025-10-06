// Systemic Greenwich Time (GMT/UTC) Fix for All 96 Subcomponents
(function() {
    console.log('🌍 Applying Greenwich Time (GMT/UTC) to all timestamps...');
    
    // Override Date.prototype.toLocaleString to always use UTC
    const originalToLocaleString = Date.prototype.toLocaleString;
    Date.prototype.toLocaleString = function(locale, options) {
        // Force UTC timezone for all date displays
        const utcOptions = {
            ...options,
            timeZone: 'UTC',
            timeZoneName: 'short'
        };
        return originalToLocaleString.call(this, 'en-GB', utcOptions);
    };
    
    // Override Date.prototype.toLocaleDateString
    const originalToLocaleDateString = Date.prototype.toLocaleDateString;
    Date.prototype.toLocaleDateString = function(locale, options) {
        const utcOptions = {
            ...options,
            timeZone: 'UTC'
        };
        return originalToLocaleDateString.call(this, 'en-GB', utcOptions);
    };
    
    // Override Date.prototype.toLocaleTimeString
    const originalToLocaleTimeString = Date.prototype.toLocaleTimeString;
    Date.prototype.toLocaleTimeString = function(locale, options) {
        const utcOptions = {
            ...options,
            timeZone: 'UTC',
            timeZoneName: 'short'
        };
        return originalToLocaleTimeString.call(this, 'en-GB', utcOptions);
    };
    
    // Helper function to format dates in GMT
    window.formatDateGMT = function(date) {
        if (!date) return '';
        const d = new Date(date);
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: 'UTC',
            timeZoneName: 'short'
        };
        return d.toLocaleString('en-GB', options).replace('UTC', 'GMT');
    };
    
    // Helper function to get current GMT time
    window.getCurrentGMT = function() {
        const now = new Date();
        return formatDateGMT(now);
    };
    
    // Update any existing timestamp displays
    function updateExistingTimestamps() {
        // Update score history timestamps
        document.querySelectorAll('.timestamp, .date-display, .time-display').forEach(element => {
            const dateText = element.textContent;
            // Try to parse and reformat if it looks like a date
            if (dateText && dateText.match(/\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}/)) {
                try {
                    const date = new Date(dateText);
                    if (!isNaN(date.getTime())) {
                        element.textContent = formatDateGMT(date);
                    }
                } catch (e) {
                    // Ignore parsing errors
                }
            }
        });
        
        // Update any data-timestamp attributes
        document.querySelectorAll('[data-timestamp]').forEach(element => {
            const timestamp = element.getAttribute('data-timestamp');
            if (timestamp) {
                try {
                    const date = new Date(timestamp);
                    if (!isNaN(date.getTime())) {
                        const formattedDate = formatDateGMT(date);
                        // Update display text if it exists
                        const displayElement = element.querySelector('.timestamp-display') || element;
                        if (displayElement.textContent.includes(':')) {
                            displayElement.textContent = formattedDate;
                        }
                    }
                } catch (e) {
                    // Ignore parsing errors
                }
            }
        });
    }
    
    // Monitor for dynamic content changes
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) { // Element node
                        // Check if it contains timestamps
                        if (node.classList && (
                            node.classList.contains('timestamp') ||
                            node.classList.contains('date-display') ||
                            node.classList.contains('time-display') ||
                            node.classList.contains('score-entry')
                        )) {
                            updateExistingTimestamps();
                        }
                    }
                });
            }
        });
    });
    
    // Start observing when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
            updateExistingTimestamps();
        });
    } else {
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
        updateExistingTimestamps();
    }
    
    // Override template generation to use GMT
    const originalGenerateTemplate = window.generateTemplate;
    if (originalGenerateTemplate) {
        window.generateTemplate = function(templateType, answers, score) {
            // Call original function
            let result = originalGenerateTemplate.apply(this, arguments);
            
            // Replace any Date().toLocaleString() calls in the result
            if (result && typeof result === 'string') {
                // Find and replace timestamp patterns
                result = result.replace(/Generated[^•]*•[^<]*/g, (match) => {
                    return `Generated by ScaleOps6 Platform • ${getCurrentGMT()}`;
                });
            }
            
            return result;
        };
    }
    
    // Fix score history date displays
    const originalLoadScoreHistory = window.loadScoreHistory;
    if (originalLoadScoreHistory) {
        window.loadScoreHistory = async function() {
            await originalLoadScoreHistory.apply(this, arguments);
            // Update timestamps after loading
            setTimeout(updateExistingTimestamps, 100);
        };
    }
    
    console.log('✅ Greenwich Time (GMT/UTC) applied systemically to all 96 subcomponents!');
    console.log('🕐 Current GMT:', getCurrentGMT());
})();
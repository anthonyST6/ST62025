/**
 * Real World Examples Completion Tracker
 * Tracks which subcomponents have real world examples implemented
 * Part of SSOT Architecture 2.0
 */

class RealWorldExamplesTracker {
    constructor() {
        // Load the complete database
        this.loadDatabase();
        
        // Track implementation status
        this.implementationStatus = new Map();
        
        // Initialize tracking
        this.initializeTracking();
    }

    /**
     * Load the real world examples database
     */
    loadDatabase() {
        try {
            // Try to load the complete database
            if (typeof window !== 'undefined') {
                // Browser environment
                this.database = window.realWorldExamplesComplete || window.realWorldExamples || {};
            } else {
                // Node.js environment
                try {
                    const { getRealWorldExamples } = require('./real-world-examples-all-96-complete.js');
                    this.getRealWorldExamples = getRealWorldExamples;
                } catch (e) {
                    console.warn('Could not load real-world-examples-all-96-complete.js');
                    this.getRealWorldExamples = () => null;
                }
            }
        } catch (error) {
            console.error('Error loading Real World Examples database:', error);
            this.database = {};
        }
    }

    /**
     * Initialize tracking of which subcomponents have examples
     */
    initializeTracking() {
        // Check all 96 subcomponents
        for (let block = 1; block <= 16; block++) {
            for (let sub = 1; sub <= 6; sub++) {
                const id = `${block}-${sub}`;
                const hasExamples = this.checkIfHasExamples(id);
                this.implementationStatus.set(id, hasExamples);
            }
        }
        
        console.log(`📊 Real World Examples Tracker initialized`);
        console.log(`   Implemented: ${this.getImplementedCount()}/96 (${this.getCompletionPercentage()}%)`);
    }

    /**
     * Check if a subcomponent has real world examples
     */
    checkIfHasExamples(subcomponentId) {
        // Check using the getRealWorldExamples function if available
        if (this.getRealWorldExamples) {
            const examples = this.getRealWorldExamples(subcomponentId);
            return examples && examples.length > 0;
        }
        
        // Check in the database object
        if (this.database && this.database[subcomponentId]) {
            const examples = this.database[subcomponentId];
            return Array.isArray(examples) && examples.length > 0;
        }
        
        return false;
    }

    /**
     * Get examples for a specific subcomponent
     */
    getExamples(subcomponentId) {
        if (this.getRealWorldExamples) {
            return this.getRealWorldExamples(subcomponentId);
        }
        
        return this.database[subcomponentId] || null;
    }

    /**
     * Get list of implemented subcomponents
     */
    getImplementedSubcomponents() {
        const implemented = [];
        for (const [id, hasExamples] of this.implementationStatus) {
            if (hasExamples) {
                implemented.push(id);
            }
        }
        return implemented;
    }

    /**
     * Get list of missing subcomponents
     */
    getMissingSubcomponents() {
        const missing = [];
        for (const [id, hasExamples] of this.implementationStatus) {
            if (!hasExamples) {
                missing.push(id);
            }
        }
        return missing;
    }

    /**
     * Get implementation count
     */
    getImplementedCount() {
        let count = 0;
        for (const hasExamples of this.implementationStatus.values()) {
            if (hasExamples) count++;
        }
        return count;
    }

    /**
     * Get completion percentage
     */
    getCompletionPercentage() {
        return ((this.getImplementedCount() / 96) * 100).toFixed(1);
    }

    /**
     * Get detailed status report
     */
    getStatusReport() {
        const report = {
            timestamp: new Date().toISOString(),
            totalSubcomponents: 96,
            implemented: this.getImplementedCount(),
            missing: 96 - this.getImplementedCount(),
            percentage: this.getCompletionPercentage() + '%',
            byBlock: {},
            implementedList: this.getImplementedSubcomponents(),
            missingList: this.getMissingSubcomponents()
        };

        // Break down by block
        for (let block = 1; block <= 16; block++) {
            const blockStatus = {
                total: 6,
                implemented: 0,
                missing: 6,
                subcomponents: {}
            };
            
            for (let sub = 1; sub <= 6; sub++) {
                const id = `${block}-${sub}`;
                const hasExamples = this.implementationStatus.get(id);
                blockStatus.subcomponents[id] = hasExamples;
                if (hasExamples) {
                    blockStatus.implemented++;
                    blockStatus.missing--;
                }
            }
            
            blockStatus.percentage = ((blockStatus.implemented / 6) * 100).toFixed(1) + '%';
            report.byBlock[`Block ${block}`] = blockStatus;
        }

        return report;
    }

    /**
     * Get priority list for implementation
     */
    getPriorityList() {
        const priorities = [];
        const missing = this.getMissingSubcomponents();
        
        // Prioritize by block order (earlier blocks are higher priority)
        missing.sort((a, b) => {
            const [blockA] = a.split('-').map(Number);
            const [blockB] = b.split('-').map(Number);
            return blockA - blockB;
        });

        // Group by priority level
        const high = missing.filter(id => {
            const [block] = id.split('-').map(Number);
            return block <= 4; // Blocks 1-4 are high priority
        });

        const medium = missing.filter(id => {
            const [block] = id.split('-').map(Number);
            return block > 4 && block <= 8; // Blocks 5-8 are medium priority
        });

        const low = missing.filter(id => {
            const [block] = id.split('-').map(Number);
            return block > 8 && block <= 12; // Blocks 9-12 are low priority
        });

        const future = missing.filter(id => {
            const [block] = id.split('-').map(Number);
            return block > 12; // Blocks 13-16 are future priority
        });

        return {
            high: {
                count: high.length,
                list: high,
                description: 'Foundation blocks - implement first'
            },
            medium: {
                count: medium.length,
                list: medium,
                description: 'Growth blocks - implement second'
            },
            low: {
                count: low.length,
                list: low,
                description: 'Scale blocks - implement third'
            },
            future: {
                count: future.length,
                list: future,
                description: 'Expansion blocks - implement last'
            }
        };
    }

    /**
     * Export report as JSON
     */
    exportReport() {
        const report = this.getStatusReport();
        const priorities = this.getPriorityList();
        
        const fullReport = {
            ...report,
            priorities,
            metadata: {
                generatedAt: new Date().toISOString(),
                generatedBy: 'RealWorldExamplesTracker',
                version: '2.0.0'
            }
        };

        if (typeof window !== 'undefined') {
            // Browser - download as file
            const blob = new Blob([JSON.stringify(fullReport, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `real-world-examples-report-${Date.now()}.json`;
            a.click();
            URL.revokeObjectURL(url);
        }

        return fullReport;
    }

    /**
     * Display report in console
     */
    displayReport() {
        const report = this.getStatusReport();
        const priorities = this.getPriorityList();

        console.log('\n📊 REAL WORLD EXAMPLES COMPLETION REPORT');
        console.log('=' .repeat(50));
        console.log(`Total Progress: ${report.implemented}/96 (${report.percentage})`);
        console.log('\n📈 By Block:');
        
        for (const [blockName, status] of Object.entries(report.byBlock)) {
            const bar = this.createProgressBar(status.implemented, 6);
            console.log(`${blockName}: ${bar} ${status.implemented}/6 (${status.percentage})`);
        }

        console.log('\n🎯 Implementation Priorities:');
        console.log(`High Priority: ${priorities.high.count} subcomponents`);
        console.log(`Medium Priority: ${priorities.medium.count} subcomponents`);
        console.log(`Low Priority: ${priorities.low.count} subcomponents`);
        console.log(`Future: ${priorities.future.count} subcomponents`);

        console.log('\n✅ Implemented Subcomponents:');
        console.log(report.implementedList.join(', ') || 'None yet');

        console.log('\n❌ Missing Subcomponents (Next to implement):');
        const nextToImplement = priorities.high.list.slice(0, 10);
        console.log(nextToImplement.join(', '));
        
        console.log('=' .repeat(50));
    }

    /**
     * Create a text progress bar
     */
    createProgressBar(current, total, width = 20) {
        const percentage = current / total;
        const filled = Math.round(width * percentage);
        const empty = width - filled;
        return '█'.repeat(filled) + '░'.repeat(empty);
    }

    /**
     * Check if a specific subcomponent has examples
     */
    hasExamples(subcomponentId) {
        return this.implementationStatus.get(subcomponentId) || false;
    }

    /**
     * Add examples for a subcomponent (for testing/development)
     */
    addExamples(subcomponentId, examples) {
        if (!this.database) {
            this.database = {};
        }
        
        this.database[subcomponentId] = examples;
        this.implementationStatus.set(subcomponentId, true);
        
        console.log(`✅ Added ${examples.length} examples for ${subcomponentId}`);
        console.log(`   New completion: ${this.getCompletionPercentage()}%`);
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RealWorldExamplesTracker;
} else {
    window.RealWorldExamplesTracker = RealWorldExamplesTracker;
    
    // Auto-initialize tracker
    window.realWorldTracker = new RealWorldExamplesTracker();
    
    // Add console commands for easy access
    window.trackRealWorldExamples = () => {
        window.realWorldTracker.displayReport();
    };
    
    window.exportRealWorldReport = () => {
        return window.realWorldTracker.exportReport();
    };
    
    console.log('💡 Use trackRealWorldExamples() to see the completion report');
    console.log('💡 Use exportRealWorldReport() to download the report as JSON');
}
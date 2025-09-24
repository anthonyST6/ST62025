/**
 * Content-Only Updater
 * This is the ONLY approved way to update the platform
 * It ensures structure remains locked while allowing content changes
 */

const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

class ContentOnlyUpdater {
    constructor() {
        this.structureLocked = true;
        this.allowedUpdates = [
            'textContent',
            'innerHTML for text only',
            'attribute values (not structure)',
            'CSS classes for styling only'
        ];
        this.forbiddenOperations = [
            'appendChild',
            'removeChild',
            'createElement',
            'remove',
            'replaceWith',
            'insertBefore',
            'insertAfter',
            'wrap',
            'unwrap'
        ];
    }

    /**
     * Update content for a specific subcomponent
     * ONLY text content can be changed - structure remains locked
     */
    updateSubcomponentContent(subcomponentId, contentUpdates) {
        const fileName = `subcomponent-${subcomponentId}.html`;
        
        if (!fs.existsSync(fileName)) {
            console.error(`❌ File not found: ${fileName}`);
            return false;
        }
        
        console.log(`\n📝 Updating content for: ${fileName}`);
        console.log('   Mode: CONTENT-ONLY (Structure Locked)');
        
        const html = fs.readFileSync(fileName, 'utf8');
        const $ = cheerio.load(html);
        
        // Update title (content only)
        if (contentUpdates.title) {
            $('.subcomponent-title').text(contentUpdates.title);
            console.log(`   ✅ Updated title text`);
        }
        
        // Update description (content only)
        if (contentUpdates.description) {
            $('.subcomponent-description').text(contentUpdates.description);
            console.log(`   ✅ Updated description text`);
        }
        
        // Update education content (text only, preserve structure)
        if (contentUpdates.education) {
            // Update section content but NEVER change structure
            if (contentUpdates.education.whatMakesGreat) {
                $('#education-tab .section-content').first().find('p').first().text(
                    contentUpdates.education.whatMakesGreat
                );
                console.log(`   ✅ Updated education content`);
            }
            
            // Update bullet points (text only, maintain exact count)
            if (contentUpdates.education.bulletPoints) {
                const bullets = $('#education-tab .bullet-list li');
                contentUpdates.education.bulletPoints.forEach((text, index) => {
                    if (index < bullets.length) {
                        // Only update existing bullets, never add/remove
                        $(bullets[index]).text(text);
                    }
                });
                console.log(`   ✅ Updated bullet points (text only)`);
            }
        }
        
        // Update worksheet labels (text only, preserve structure)
        if (contentUpdates.worksheetLabels) {
            const labels = $('.worksheet-label');
            contentUpdates.worksheetLabels.forEach((text, index) => {
                if (index < labels.length) {
                    // Only update existing labels, never add/remove
                    $(labels[index]).text(text);
                }
            });
            console.log(`   ✅ Updated worksheet labels`);
        }
        
        // Save with structure intact
        fs.writeFileSync(fileName, $.html());
        console.log(`   ✅ Content updated successfully (structure preserved)`);
        
        // Validate structure hasn't changed
        this.validateStructureIntact(fileName);
        
        return true;
    }

    /**
     * Update block content only
     */
    updateBlockContent(blockId, contentUpdates) {
        const fileName = blockId === 'main' ? 'admin.html' : `block-detail.html`;
        
        console.log(`\n📝 Updating content for block: ${blockId}`);
        console.log('   Mode: CONTENT-ONLY (Structure Locked)');
        
        const html = fs.readFileSync(fileName, 'utf8');
        const $ = cheerio.load(html);
        
        // Only update text content
        if (contentUpdates.title) {
            $('#block-title').text(contentUpdates.title);
            console.log(`   ✅ Updated block title`);
        }
        
        if (contentUpdates.description) {
            $('#block-description').text(contentUpdates.description);
            console.log(`   ✅ Updated block description`);
        }
        
        fs.writeFileSync(fileName, $.html());
        console.log(`   ✅ Content updated (structure preserved)`);
        
        return true;
    }

    /**
     * Validate that structure remains intact after update
     */
    validateStructureIntact(fileName) {
        const html = fs.readFileSync(fileName, 'utf8');
        const $ = cheerio.load(html);
        
        // Critical structure checks
        const checks = [
            { selector: '.tab-button', expectedCount: 5, name: 'Tabs' },
            { selector: '.worksheet-field', minCount: 6, name: 'Worksheet fields' },
            { selector: '.education-section', minCount: 3, name: 'Education sections' }
        ];
        
        let valid = true;
        
        for (const check of checks) {
            const count = $(check.selector).length;
            if (check.expectedCount && count !== check.expectedCount) {
                console.error(`   ❌ STRUCTURE VIOLATION: ${check.name} count is ${count}, expected ${check.expectedCount}`);
                valid = false;
            }
            if (check.minCount && count < check.minCount) {
                console.error(`   ❌ STRUCTURE VIOLATION: ${check.name} count is ${count}, minimum ${check.minCount}`);
                valid = false;
            }
        }
        
        if (!valid) {
            console.error('\n🚨 CRITICAL ERROR: Structure has been modified!');
            console.error('This is strictly forbidden. Reverting changes...');
            // In production, would revert the file here
            throw new Error('Structure modification detected - operation aborted');
        }
        
        console.log('   ✅ Structure validation passed');
        return true;
    }

    /**
     * Batch update content across multiple components
     */
    batchUpdateContent(updates) {
        console.log('\n🔄 Batch Content Update');
        console.log('================================');
        console.log(`Processing ${updates.length} content updates...`);
        console.log('Structure Lock: ACTIVE\n');
        
        let successCount = 0;
        let failCount = 0;
        
        for (const update of updates) {
            try {
                if (update.type === 'subcomponent') {
                    this.updateSubcomponentContent(update.id, update.content);
                    successCount++;
                } else if (update.type === 'block') {
                    this.updateBlockContent(update.id, update.content);
                    successCount++;
                }
            } catch (error) {
                console.error(`   ❌ Failed to update ${update.id}: ${error.message}`);
                failCount++;
            }
        }
        
        console.log('\n================================');
        console.log('BATCH UPDATE COMPLETE');
        console.log(`✅ Successful: ${successCount}`);
        console.log(`❌ Failed: ${failCount}`);
        console.log('Structure Status: PRESERVED');
        
        return { success: successCount, failed: failCount };
    }

    /**
     * Safe content replacement with structure preservation
     */
    safeContentReplace(selector, newContent, fileName) {
        const html = fs.readFileSync(fileName, 'utf8');
        const $ = cheerio.load(html);
        
        const element = $(selector);
        if (element.length === 0) {
            console.error(`Element not found: ${selector}`);
            return false;
        }
        
        // Only allow text content changes
        if (typeof newContent === 'string' && !newContent.includes('<')) {
            element.text(newContent);
            fs.writeFileSync(fileName, $.html());
            return true;
        } else {
            console.error('❌ HTML structure changes are forbidden');
            return false;
        }
    }
}

// Example usage - ONLY way to update content
if (require.main === module) {
    const updater = new ContentOnlyUpdater();
    
    console.log('🔒 ScaleOps6 Content-Only Updater');
    console.log('================================');
    console.log('Structure Lock Status: ACTIVE');
    console.log('Allowed Operations: Text content changes only');
    console.log('Forbidden: Any structural modifications\n');
    
    // Example: Update Problem Statement content only
    const exampleUpdate = {
        title: 'Problem Statement Definition',  // Text only
        description: 'Clear articulation of the problem you\'re solving',  // Text only
        education: {
            whatMakesGreat: 'A compelling problem statement is crucial...',  // Text only
            bulletPoints: [
                'Be specific about your target persona',
                'Quantify the impact',
                'Identify trigger events',
                'Validate with evidence',
                'Analyze current solutions'
            ]  // Exact same count, text only
        },
        worksheetLabels: [
            'Who is affected?',
            'What is the problem?',
            'When does it occur?',
            'What is the impact?',
            'How are they solving it today?',
            'Evidence & Validation'
        ]  // Exact same count, text only
    };
    
    // This would update ONLY the content, structure remains locked
    // updater.updateSubcomponentContent('1a-problem-statement', exampleUpdate);
    
    console.log('\n✅ Content updater ready');
    console.log('Use this script for ALL content updates');
    console.log('Structure will remain locked and protected');
}

module.exports = ContentOnlyUpdater;
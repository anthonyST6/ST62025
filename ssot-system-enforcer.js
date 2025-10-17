/**
 * SSOT System Enforcer - Universal Implementation
 * Ensures Single Source of Truth alignment across all 96 subcomponents
 * Version: 2.0.0
 * 
 * This is the master enforcement system that guarantees SSOT compliance
 * throughout the entire application.
 */

(function() {
    'use strict';

    console.log('🛡️ SSOT System Enforcer v2.0 initializing...');

    // Global configuration
    const CONFIG = {
        API_BASE: '/api/subcomponents/',
        MONITORING_INTERVAL: 100, // ms
        CACHE_DURATION: 5 * 60 * 1000, // 5 minutes
        MAX_RETRIES: 3,
        RETRY_DELAY: 1000, // ms
        DEBUG_MODE: true,
        ENFORCEMENT_ENABLED: true,
        VALIDATION_STRICT: true
    };

    // SSOT data cache
    const ssotCache = new Map();
    const violationLog = [];
    const correctionStats = {
        total: 0,
        byElement: {},
        bySubcomponent: {},
        lastCheck: null
    };

    /**
     * Main SSOT System Enforcer Class
     */
    class SSOTSystemEnforcer {
        constructor() {
            this.subcomponentId = this.detectSubcomponentId();
            this.ssotData = null;
            this.observers = new Map();
            this.protectedElements = new Set();
            this.initialized = false;
            this.validationRules = this.loadValidationRules();
        }

        /**
         * Initialize the enforcer system
         */
        async initialize() {
            try {
                console.log('🚀 Initializing SSOT System Enforcer...');
                
                // Load SSOT data
                await this.loadSSOTData();
                
                // Setup protection mechanisms
                this.setupDOMProtection();
                this.setupMutationObservers();
                this.setupEventInterceptors();
                this.setupAPIInterceptors();
                
                // Start monitoring
                this.startContinuousMonitoring();
                
                // Setup debugging interface
                this.setupDebugInterface();
                
                this.initialized = true;
                console.log('✅ SSOT System Enforcer initialized successfully');
                
                // Initial enforcement
                this.enforceSSoT();
                
                return true;
            } catch (error) {
                console.error('❌ Failed to initialize SSOT System Enforcer:', error);
                return false;
            }
        }

        /**
         * Detect current subcomponent ID from URL
         */
        detectSubcomponentId() {
            const urlParams = new URLSearchParams(window.location.search);
            const id = urlParams.get('id');
            
            if (!id) {
                // Try to detect from page context
                const pathMatch = window.location.pathname.match(/subcomponent-(\d+-\d+)/);
                if (pathMatch) {
                    return pathMatch[1];
                }
            }
            
            return id || null;
        }

        /**
         * Load SSOT data from server
         */
        async loadSSOTData() {
            if (!this.subcomponentId) {
                console.warn('⚠️ No subcomponent ID detected');
                return null;
            }

            // Check cache first
            const cached = ssotCache.get(this.subcomponentId);
            if (cached && (Date.now() - cached.timestamp < CONFIG.CACHE_DURATION)) {
                console.log('📦 Using cached SSOT data');
                this.ssotData = cached.data;
                return cached.data;
            }

            console.log(`📡 Fetching SSOT data for subcomponent: ${this.subcomponentId}`);
            
            let retries = 0;
            while (retries < CONFIG.MAX_RETRIES) {
                try {
                    const response = await fetch(`${CONFIG.API_BASE}${this.subcomponentId}`);
                    if (!response.ok) {
                        throw new Error(`HTTP ${response.status}`);
                    }
                    
                    const data = await response.json();
                    
                    // Validate SSOT structure
                    if (!this.validateSSOTStructure(data)) {
                        throw new Error('Invalid SSOT data structure');
                    }
                    
                    // Cache the data
                    ssotCache.set(this.subcomponentId, {
                        data: data,
                        timestamp: Date.now()
                    });
                    
                    this.ssotData = data;
                    console.log('✅ SSOT data loaded successfully:', data);
                    return data;
                    
                } catch (error) {
                    retries++;
                    console.error(`❌ Failed to load SSOT data (attempt ${retries}):`, error);
                    
                    if (retries < CONFIG.MAX_RETRIES) {
                        await this.delay(CONFIG.RETRY_DELAY * retries);
                    }
                }
            }
            
            throw new Error('Failed to load SSOT data after maximum retries');
        }

        /**
         * Validate SSOT data structure
         */
        validateSSOTStructure(data) {
            const requiredFields = ['id', 'name', 'agent'];
            const hasRequired = requiredFields.every(field => data.hasOwnProperty(field));
            
            if (!hasRequired) {
                console.error('❌ SSOT data missing required fields');
                return false;
            }
            
            // Additional validation
            if (data.education && !data.education.examples) {
                console.warn('⚠️ SSOT education data missing examples');
            }
            
            return true;
        }

        /**
         * Setup DOM protection
         */
        setupDOMProtection() {
            // Critical elements to protect
            const criticalElements = [
                'subcomponent-title',
                'subcomponent-name',
                'subcomponent-description',
                'education-tab',
                'workspace-tab',
                'resources-tab',
                'output-tab'
            ];

            criticalElements.forEach(id => {
                const element = document.getElementById(id);
                if (element) {
                    this.protectElement(element);
                }
            });

            // Protect dynamic content areas
            this.protectDynamicContent();
        }

        /**
         * Protect a specific element
         */
        protectElement(element) {
            if (!element) return;
            
            this.protectedElements.add(element);
            
            // Make element read-only
            Object.defineProperty(element, 'innerHTML', {
                get: function() {
                    return this._innerHTML || '';
                },
                set: function(value) {
                    if (CONFIG.ENFORCEMENT_ENABLED) {
                        console.warn('🛡️ Blocked innerHTML modification on protected element');
                        violationLog.push({
                            type: 'innerHTML',
                            element: element.id,
                            attempted: value,
                            timestamp: Date.now()
                        });
                        return;
                    }
                    this._innerHTML = value;
                }
            });
        }

        /**
         * Protect dynamic content areas
         */
        protectDynamicContent() {
            // Intercept common content modification methods
            const originalMethods = {
                appendChild: Element.prototype.appendChild,
                removeChild: Element.prototype.removeChild,
                replaceChild: Element.prototype.replaceChild,
                insertBefore: Element.prototype.insertBefore
            };

            Object.keys(originalMethods).forEach(method => {
                Element.prototype[method] = function(...args) {
                    if (this.closest('[data-ssot-protected="true"]')) {
                        console.warn(`🛡️ Blocked ${method} on protected element`);
                        violationLog.push({
                            type: method,
                            element: this.id || this.className,
                            timestamp: Date.now()
                        });
                        
                        if (CONFIG.ENFORCEMENT_ENABLED) {
                            return null;
                        }
                    }
                    return originalMethods[method].apply(this, args);
                };
            });
        }

        /**
         * Setup mutation observers
         */
        setupMutationObservers() {
            const observer = new MutationObserver((mutations) => {
                mutations.forEach(mutation => {
                    this.handleMutation(mutation);
                });
            });

            // Observe entire document
            observer.observe(document.body, {
                childList: true,
                subtree: true,
                attributes: true,
                attributeOldValue: true,
                characterData: true,
                characterDataOldValue: true
            });

            this.observers.set('main', observer);
        }

        /**
         * Handle DOM mutations
         */
        handleMutation(mutation) {
            const target = mutation.target;
            
            // Check if mutation affects protected content
            if (this.isProtectedContent(target)) {
                console.log('🔍 Detected mutation on protected content');
                
                // Log violation
                violationLog.push({
                    type: mutation.type,
                    target: target.id || target.className,
                    timestamp: Date.now()
                });
                
                // Revert if necessary
                if (CONFIG.ENFORCEMENT_ENABLED) {
                    this.revertMutation(mutation);
                }
            }
        }

        /**
         * Check if content is protected
         */
        isProtectedContent(element) {
            if (!element || !element.nodeType) return false;
            
            // Check if element or its parent is protected
            if (this.protectedElements.has(element)) return true;
            
            // Check for SSOT-critical IDs
            const criticalIds = [
                'subcomponent-title',
                'subcomponent-name',
                'subcomponent-description',
                'education-content',
                'real-world-examples'
            ];
            
            if (element.id && criticalIds.includes(element.id)) {
                return true;
            }
            
            // Check parent hierarchy
            const parent = element.closest('[data-ssot-protected="true"]');
            return !!parent;
        }

        /**
         * Revert a mutation
         */
        revertMutation(mutation) {
            try {
                if (mutation.type === 'characterData') {
                    mutation.target.textContent = mutation.oldValue;
                } else if (mutation.type === 'attributes') {
                    mutation.target.setAttribute(mutation.attributeName, mutation.oldValue);
                }
                
                correctionStats.total++;
                console.log('✅ Reverted unauthorized mutation');
            } catch (error) {
                console.error('❌ Failed to revert mutation:', error);
            }
        }

        /**
         * Setup event interceptors
         */
        setupEventInterceptors() {
            // Intercept content-modifying events
            const events = ['DOMContentLoaded', 'load', 'contentChanged', 'dataUpdate'];
            
            events.forEach(eventType => {
                window.addEventListener(eventType, (event) => {
                    if (CONFIG.DEBUG_MODE) {
                        console.log(`📡 Intercepted ${eventType} event`);
                    }
                    
                    // Enforce SSOT after content changes
                    setTimeout(() => this.enforceSSoT(), 100);
                }, true);
            });
        }

        /**
         * Setup API interceptors
         */
        setupAPIInterceptors() {
            // Intercept fetch requests
            const originalFetch = window.fetch;
            window.fetch = async (...args) => {
                const response = await originalFetch(...args);
                
                // Check if this is a subcomponent data request
                if (args[0] && args[0].includes('/api/subcomponents/')) {
                    console.log('📡 Intercepted subcomponent API call');
                    
                    // Clone response to read it
                    const clone = response.clone();
                    const data = await clone.json();
                    
                    // Validate against SSOT
                    this.validateAPIResponse(data);
                }
                
                return response;
            };

            // Intercept XMLHttpRequest
            const originalXHR = window.XMLHttpRequest.prototype.open;
            window.XMLHttpRequest.prototype.open = function(...args) {
                if (args[1] && args[1].includes('/api/subcomponents/')) {
                    console.log('📡 Intercepted XHR subcomponent request');
                    
                    this.addEventListener('load', () => {
                        try {
                            const data = JSON.parse(this.responseText);
                            window.SSOTSystemEnforcer.validateAPIResponse(data);
                        } catch (e) {
                            // Not JSON response
                        }
                    });
                }
                
                return originalXHR.apply(this, args);
            };
        }

        /**
         * Validate API response against SSOT
         */
        validateAPIResponse(data) {
            if (!this.ssotData) return;
            
            const violations = [];
            
            // Check key fields
            if (data.name !== this.ssotData.name) {
                violations.push({
                    field: 'name',
                    expected: this.ssotData.name,
                    received: data.name
                });
            }
            
            if (data.agent !== this.ssotData.agent) {
                violations.push({
                    field: 'agent',
                    expected: this.ssotData.agent,
                    received: data.agent
                });
            }
            
            if (violations.length > 0) {
                console.error('❌ API response violates SSOT:', violations);
                violationLog.push({
                    type: 'api_response',
                    violations: violations,
                    timestamp: Date.now()
                });
            }
        }

        /**
         * Start continuous monitoring
         */
        startContinuousMonitoring() {
            setInterval(() => {
                this.enforceSSoT();
                correctionStats.lastCheck = Date.now();
            }, CONFIG.MONITORING_INTERVAL);
            
            console.log('👁️ Continuous SSOT monitoring active');
        }

        /**
         * Enforce SSOT across the page
         */
        enforceSSoT() {
            if (!this.ssotData || !CONFIG.ENFORCEMENT_ENABLED) return;
            
            let corrections = 0;
            
            // Enforce title
            const titleElement = document.getElementById('subcomponent-title');
            if (titleElement && titleElement.textContent !== this.ssotData.name.toUpperCase()) {
                titleElement.textContent = this.ssotData.name.toUpperCase();
                corrections++;
                this.logCorrection('title', titleElement.textContent, this.ssotData.name.toUpperCase());
            }
            
            // Enforce name in breadcrumb
            const nameElement = document.getElementById('subcomponent-name');
            if (nameElement && nameElement.textContent !== this.ssotData.name) {
                nameElement.textContent = this.ssotData.name;
                corrections++;
                this.logCorrection('name', nameElement.textContent, this.ssotData.name);
            }
            
            // Enforce description
            const descElement = document.getElementById('subcomponent-description');
            if (descElement && this.ssotData.description && 
                descElement.textContent !== this.ssotData.description) {
                descElement.textContent = this.ssotData.description;
                corrections++;
                this.logCorrection('description', descElement.textContent, this.ssotData.description);
            }
            
            // Enforce education content
            this.enforceEducationContent();
            
            // DON'T enforce real-world examples - let display script handle it
            // this.enforceRealWorldExamples(); // DISABLED to prevent duplicates
            
            // Enforce templates
            this.enforceTemplates();
            
            if (corrections > 0) {
                console.log(`✅ SSOT Enforcer made ${corrections} corrections`);
                correctionStats.total += corrections;
                
                if (!correctionStats.bySubcomponent[this.subcomponentId]) {
                    correctionStats.bySubcomponent[this.subcomponentId] = 0;
                }
                correctionStats.bySubcomponent[this.subcomponentId] += corrections;
            }
        }

        /**
         * Enforce education content
         */
        enforceEducationContent() {
            // DISABLED: Don't enforce education content
            // The fix-education-use-cases-display.js script handles rendering
            console.log('⏭️ Skipping education content enforcement - handled by display script');
            return;
        }

        /**
         * Enforce real-world examples
         */
        enforceRealWorldExamples() {
            if (!this.ssotData.education) return;
            
            // Use useCases if available, otherwise fall back to examples
            const examples = this.ssotData.education.useCases || this.ssotData.education.examples;
            if (!examples || examples.length === 0) return;
            
            // Find examples section
            const examplesSection = document.querySelector('.real-world-examples, #real-world-examples');
            if (!examplesSection) return;
            
            // Check if rich format (objects with company/problem/impact)
            const isRichFormat = examples[0] && typeof examples[0] === 'object' && examples[0].company;
            
            if (isRichFormat) {
                // Don't enforce - let the display script handle rich formatting
                console.log('✅ Rich use cases detected, skipping enforcement');
                return;
            }
            
            // Only enforce for simple string examples
            const currentExamples = Array.from(examplesSection.querySelectorAll('li'))
                .map(li => li.textContent.trim());
            
            const ssotExamples = examples.map(ex => typeof ex === 'string' ? ex.trim() : ex);
            
            if (!this.arraysEqual(currentExamples, ssotExamples)) {
                // Rebuild examples section
                const html = `
                    <h2 class="section-title">
                        <span class="section-icon">💼</span>
                        Real-World Examples
                    </h2>
                    <ul class="bullet-list">
                        ${examples.map(ex => `<li>${ex}</li>`).join('')}
                    </ul>
                `;
                examplesSection.innerHTML = html;
                this.logCorrection('examples', currentExamples.length, examples.length);
            }
        }

        /**
         * Enforce templates
         */
        enforceTemplates() {
            if (!this.ssotData.resources || !this.ssotData.resources.templates) return;
            
            const templatesContainer = document.getElementById('resource-templates');
            if (!templatesContainer) return;
            
            const ssotTemplates = this.ssotData.resources.templates;
            
            // Check current templates
            const currentTemplates = Array.from(templatesContainer.querySelectorAll('.template-name'))
                .map(el => el.textContent.trim());
            
            if (!this.arraysEqual(currentTemplates, ssotTemplates)) {
                // Rebuild templates
                const html = this.generateTemplatesHTML(ssotTemplates);
                templatesContainer.innerHTML = html;
                this.logCorrection('templates', currentTemplates.length, ssotTemplates.length);
            }
        }

        /**
         * Generate education HTML from SSOT
         */
        generateEducationHTML(education) {
            let html = '';
            
            if (education.what) {
                html += `
                    <div class="education-section">
                        <h2 class="section-title">
                            <span class="section-icon">🎯</span>
                            What is ${education.title || 'This'}?
                        </h2>
                        <div class="section-content">
                            <p>${education.what}</p>
                        </div>
                    </div>
                `;
            }
            
            if (education.why) {
                html += `
                    <div class="education-section">
                        <h2 class="section-title">
                            <span class="section-icon">💡</span>
                            Why It Matters
                        </h2>
                        <div class="section-content">
                            <p>${education.why}</p>
                        </div>
                    </div>
                `;
            }
            
            if (education.how) {
                html += `
                    <div class="education-section">
                        <h2 class="section-title">
                            <span class="section-icon">🚀</span>
                            How to Implement
                        </h2>
                        <div class="section-content">
                            ${education.how}
                        </div>
                    </div>
                `;
            }
            
            // Use useCases if available, otherwise examples
            const examples = education.useCases || education.examples;
            if (examples && examples.length > 0) {
                // Check if rich format
                const isRichFormat = examples[0] && typeof examples[0] === 'object' && examples[0].company;
                
                if (isRichFormat) {
                    // Rich use cases with company cards
                    html += `
                        <div class="education-section">
                            <h2 class="section-title">
                                <span class="section-icon">🏢</span>
                                Real-World Use Cases
                            </h2>
                            <div class="use-cases-grid" style="
                                display: grid;
                                grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                                gap: 20px;
                                margin-top: 20px;
                            ">
                                ${examples.map((useCase, index) => {
                                    const logoLetter = useCase.company.charAt(0);
                                    const colors = ['#FF5500', '#9C27B0', '#2196F3', '#4CAF50', '#FFC107', '#E91E63'];
                                    const color = colors[index % colors.length];
                                    
                                    return `
                                        <div class="use-case-card" style="
                                            background: rgba(255, 255, 255, 0.02);
                                            border: 2px solid ${color}33;
                                            border-radius: 15px;
                                            padding: 25px;
                                            transition: all 0.3s ease;
                                            cursor: pointer;
                                            position: relative;
                                            overflow: hidden;
                                        "
                                        onmouseover="this.style.transform='translateY(-5px)'; this.style.borderColor='${color}'; this.style.boxShadow='0 10px 30px ${color}33';"
                                        onmouseout="this.style.transform='translateY(0)'; this.style.borderColor='${color}33'; this.style.boxShadow='none';">
                                            
                                            <div style="
                                                width: 60px;
                                                height: 60px;
                                                background: linear-gradient(135deg, ${color}, ${color}88);
                                                border-radius: 12px;
                                                display: flex;
                                                align-items: center;
                                                justify-content: center;
                                                font-size: 28px;
                                                font-weight: bold;
                                                color: white;
                                                margin-bottom: 15px;
                                                box-shadow: 0 4px 15px ${color}44;
                                            ">${logoLetter}</div>
                                            
                                            <h3 style="
                                                color: ${color};
                                                font-size: 22px;
                                                font-weight: 700;
                                                margin: 0 0 10px 0;
                                                letter-spacing: -0.5px;
                                            ">${useCase.company}</h3>
                                            
                                            <p style="
                                                color: #ccc;
                                                font-size: 14px;
                                                line-height: 1.6;
                                                margin: 0 0 15px 0;
                                                min-height: 60px;
                                            ">${useCase.problem}</p>
                                            
                                            <div style="
                                                background: linear-gradient(135deg, ${color}22, ${color}11);
                                                border: 1px solid ${color}44;
                                                border-radius: 20px;
                                                padding: 8px 16px;
                                                display: inline-block;
                                                margin-top: 10px;
                                            ">
                                                <span style="
                                                    color: ${color};
                                                    font-size: 13px;
                                                    font-weight: 600;
                                                    text-transform: uppercase;
                                                    letter-spacing: 0.5px;
                                                ">Impact</span>
                                                <span style="
                                                    color: white;
                                                    font-size: 14px;
                                                    font-weight: 700;
                                                    margin-left: 8px;
                                                ">${useCase.impact}</span>
                                            </div>
                                            
                                            <div style="
                                                position: absolute;
                                                top: 0;
                                                right: 0;
                                                width: 100px;
                                                height: 100px;
                                                background: radial-gradient(circle at top right, ${color}11, transparent);
                                                pointer-events: none;
                                            "></div>
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                        </div>
                    `;
                } else {
                    // Simple bullet list for string examples
                    html += `
                        <div class="education-section">
                            <h2 class="section-title">
                                <span class="section-icon">💼</span>
                                Real-World Examples
                            </h2>
                            <div class="section-content">
                                <ul class="bullet-list">
                                    ${examples.map(ex => `<li>${ex}</li>`).join('')}
                                </ul>
                            </div>
                        </div>
                    `;
                }
            }
            
            return html;
        }

        /**
         * Generate templates HTML
         */
        generateTemplatesHTML(templates) {
            return templates.map((template, index) => `
                <div class="template-item">
                    <div class="template-content">
                        <div class="template-icon">📄</div>
                        <div>
                            <h4 class="template-name">${template}</h4>
                            <p>Professional ScaleOps6 template</p>
                        </div>
                    </div>
                    <button class="template-action" 
                            onclick="downloadTemplateFile('${template}', '${this.subcomponentId}')">
                        ⬇️ Download
                    </button>
                </div>
            `).join('');
        }

        /**
         * Check if contents differ significantly
         */
        contentsDiffer(content1, content2) {
            // Normalize for comparison
            const normalize = (str) => str.replace(/\s+/g, ' ').trim().toLowerCase();
            return normalize(content1) !== normalize(content2);
        }

        /**
         * Check if arrays are equal
         */
        arraysEqual(arr1, arr2) {
            if (arr1.length !== arr2.length) return false;
            return arr1.every((val, index) => val === arr2[index]);
        }

        /**
         * Log a correction
         */
        logCorrection(element, from, to) {
            if (CONFIG.DEBUG_MODE) {
                console.log(`🔧 Corrected ${element}: "${from}" → "${to}"`);
            }
            
            if (!correctionStats.byElement[element]) {
                correctionStats.byElement[element] = 0;
            }
            correctionStats.byElement[element]++;
        }

        /**
         * Load validation rules
         */
        loadValidationRules() {
            return {
                title: {
                    required: true,
                    transform: 'uppercase',
                    source: 'ssotData.name'
                },
                name: {
                    required: true,
                    source: 'ssotData.name'
                },
                description: {
                    required: false,
                    source: 'ssotData.description'
                },
                examples: {
                    required: true,
                    minCount: 1,
                    source: 'ssotData.education.examples'
                },
                templates: {
                    required: true,
                    minCount: 1,
                    source: 'ssotData.resources.templates'
                }
            };
        }

        /**
         * Setup debug interface
         */
        setupDebugInterface() {
            // Expose to global scope for debugging
            window.SSOTSystemEnforcer = this;
            
            // Debug commands
            window.SSOT = {
                status: () => this.getStatus(),
                data: () => this.ssotData,
                stats: () => correctionStats,
                violations: () => violationLog,
                enforce: () => this.enforceSSoT(),
                reload: () => this.loadSSOTData(),
                validate: () => this.validatePage(),
                config: CONFIG,
                cache: () => ssotCache,
                clear: () => {
                    ssotCache.clear();
                    console.log('✅ SSOT cache cleared');
                },
                test: (id) => this.testSubcomponent(id)
            };
            
            console.log('📝 SSOT Debug Interface Available:');
            console.log('   SSOT.status() - Check system status');
            console.log('   SSOT.data() - View current SSOT data');
            console.log('   SSOT.stats() - View correction statistics');
            console.log('   SSOT.violations() - View violation log');
            console.log('   SSOT.enforce() - Manually enforce SSOT');
            console.log('   SSOT.reload() - Reload SSOT data');
            console.log('   SSOT.validate() - Validate current page');
            console.log('   SSOT.test(id) - Test specific subcomponent');
        }

        /**
         * Get system status
         */
        getStatus() {
            return {
                initialized: this.initialized,
                subcomponentId: this.subcomponentId,
                hasData: !!this.ssotData,
                enforcementEnabled: CONFIG.ENFORCEMENT_ENABLED,
                protectedElements: this.protectedElements.size,
                corrections: correctionStats.total,
                violations: violationLog.length,
                lastCheck: correctionStats.lastCheck,
                cacheSize: ssotCache.size
            };
        }

        /**
         * Validate current page
         */
        validatePage() {
            const results = {
                valid: true,
                errors: [],
                warnings: []
            };
            
            if (!this.ssotData) {
                results.valid = false;
                results.errors.push('No SSOT data loaded');
                return results;
            }
            
            // Check title
            const title = document.getElementById('subcomponent-title');
            if (title && title.textContent !== this.ssotData.name.toUpperCase()) {
                results.valid = false;
                results.errors.push(`Title mismatch: "${title.textContent}" !== "${this.ssotData.name.toUpperCase()}"`);
            }
            
            // Check examples
            if (this.ssotData.education && this.ssotData.education.examples) {
                const examplesFound = document.querySelectorAll('.bullet-list li').length;
                const examplesExpected = this.ssotData.education.examples.length;
                
                if (examplesFound !== examplesExpected) {
                    results.valid = false;
                    results.errors.push(`Examples count mismatch: ${examplesFound} !== ${examplesExpected}`);
                }
            }
            
            // Check templates
            if (this.ssotData.resources && this.ssotData.resources.templates) {
                const templatesFound = document.querySelectorAll('.template-item').length;
                const templatesExpected = this.ssotData.resources.templates.length;
                
                if (templatesFound !== templatesExpected) {
                    results.warnings.push(`Templates count mismatch: ${templatesFound} !== ${templatesExpected}`);
                }
            }
            
            console.log(results.valid ? '✅ Page is valid' : '❌ Page has validation errors');
            return results;
        }

        /**
         * Test a specific subcomponent
         */
        async testSubcomponent(id) {
            console.log(`🧪 Testing subcomponent ${id}...`);
            
            try {
                const response = await fetch(`${CONFIG.API_BASE}${id}`);
                const data = await response.json();
                
                console.log('📦 SSOT Data:', data);
                
                // Validate structure
                const valid = this.validateSSOTStructure(data);
                console.log(valid ? '✅ Valid structure' : '❌ Invalid structure');
                
                // Check for examples
                if (data.education && data.education.examples) {
                    console.log(`✅ ${data.education.examples.length} examples found`);
                } else {
                    console.warn('⚠️ No examples found');
                }
                
                // Check for templates
                if (data.resources && data.resources.templates) {
                    console.log(`✅ ${data.resources.templates.length} templates found`);
                } else {
                    console.warn('⚠️ No templates found');
                }
                
                return data;
            } catch (error) {
                console.error('❌ Test failed:', error);
                return null;
            }
        }

        /**
         * Utility: delay function
         */
        delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeEnforcer);
    } else {
        initializeEnforcer();
    }

    async function initializeEnforcer() {
        const enforcer = new SSOTSystemEnforcer();
        await enforcer.initialize();
    }

})();
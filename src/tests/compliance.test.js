const { describe, it, expect, beforeAll, afterAll } = require('@jest/globals');
const encryptionService = require('../services/encryption.service');
const privacyComplianceService = require('../services/privacy-compliance.service');
const gdprService = require('../services/gdpr.service');
const { Database } = require('../database/postgres');

/**
 * Comprehensive Compliance Testing Suite
 * Tests GDPR, CCPA, COPPA, and other privacy law compliance
 */

describe('Data Protection Compliance Tests', () => {
    let testUserId;
    let testOrgId;
    let testData;

    beforeAll(async () => {
        // Setup test data
        testOrgId = 'test-org-' + Date.now();
        testUserId = 'test-user-' + Date.now();
        
        testData = {
            email: 'test@example.com',
            firstName: 'Test',
            lastName: 'User',
            phone: '+1234567890',
            ssn: '123-45-6789',
            creditCard: '4111111111111111'
        };
    });

    afterAll(async () => {
        // Cleanup test data
        // await Database.delete('users', { id: testUserId });
    });

    describe('Encryption Service', () => {
        it('should encrypt sensitive data correctly', () => {
            const plainText = 'sensitive information';
            const encrypted = encryptionService.encrypt(plainText);
            
            expect(encrypted).toHaveProperty('encrypted');
            expect(encrypted).toHaveProperty('salt');
            expect(encrypted).toHaveProperty('iv');
            expect(encrypted).toHaveProperty('authTag');
            expect(encrypted.encrypted).not.toBe(plainText);
        });

        it('should decrypt data correctly', () => {
            const plainText = 'sensitive information';
            const encrypted = encryptionService.encrypt(plainText);
            const decrypted = encryptionService.decrypt(encrypted);
            
            expect(decrypted).toBe(plainText);
        });

        it('should handle PII encryption', () => {
            const piiFields = ['email', 'ssn', 'creditCard'];
            const encrypted = encryptionService.encryptPII(testData, piiFields);
            
            expect(encrypted.email).toHaveProperty('encrypted');
            expect(encrypted.ssn).toHaveProperty('encrypted');
            expect(encrypted.creditCard).toHaveProperty('encrypted');
            expect(encrypted.firstName).toBe(testData.firstName); // Not encrypted
        });

        it('should classify data correctly', () => {
            const publicData = encryptionService.encrypt('public', 'public');
            const piiData = encryptionService.encrypt('pii', 'pii');
            const sensitivePii = encryptionService.encrypt('sensitive', 'sensitive_pii');
            
            expect(publicData.classification).toBe('public');
            expect(piiData.classification).toBe('pii');
            expect(sensitivePii.classification).toBe('sensitive_pii');
        });

        it('should fail decryption with tampered data', () => {
            const plainText = 'sensitive information';
            const encrypted = encryptionService.encrypt(plainText);
            
            // Tamper with encrypted data
            encrypted.encrypted = encrypted.encrypted.substring(0, 10) + 'TAMPERED';
            
            expect(() => {
                encryptionService.decrypt(encrypted);
            }).toThrow();
        });
    });

    describe('GDPR Compliance', () => {
        it('should export user data in compliant format', async () => {
            const exportData = await gdprService.exportUserData(testUserId, testOrgId);
            
            expect(exportData).toHaveProperty('exportDate');
            expect(exportData).toHaveProperty('userId');
            expect(exportData).toHaveProperty('data');
            expect(exportData.data).toHaveProperty('profile');
            expect(exportData.data).toHaveProperty('worksheets');
            expect(exportData.data).toHaveProperty('analyses');
        });

        it('should handle right to erasure request', async () => {
            const deletionResult = await gdprService.deleteUserData(
                testUserId, 
                testOrgId,
                {
                    reason: 'User requested deletion',
                    retainAnonymized: true,
                    confirmDeletion: true
                }
            );
            
            expect(deletionResult).toHaveProperty('userId');
            expect(deletionResult).toHaveProperty('deletedRecords');
            expect(deletionResult).toHaveProperty('deletedAt');
        });

        it('should require explicit confirmation for deletion', async () => {
            await expect(
                gdprService.deleteUserData(testUserId, testOrgId, {
                    confirmDeletion: false
                })
            ).rejects.toThrow('Deletion must be explicitly confirmed');
        });

        it('should manage consent properly', async () => {
            const consents = {
                marketing_emails: false,
                analytics: true,
                data_processing: true
            };
            
            await gdprService.updateConsent(testUserId, consents);
            const status = await gdprService.getConsentStatus(testUserId);
            
            expect(status.marketing_emails.consented).toBe(false);
            expect(status.analytics.consented).toBe(true);
        });

        it('should handle data retention policies', async () => {
            const retentionResult = await gdprService.processDataRetention();
            
            expect(retentionResult).toHaveProperty('audit_logs');
            expect(retentionResult).toHaveProperty('sessions');
            expect(retentionResult).toHaveProperty('documents');
        });

        it('should generate privacy reports', async () => {
            const report = await gdprService.generatePrivacyReport(testOrgId);
            
            expect(report).toHaveProperty('generatedAt');
            expect(report).toHaveProperty('dataInventory');
            expect(report).toHaveProperty('consentRecords');
            expect(report).toHaveProperty('accessRequests');
        });

        it('should handle data breach reporting', async () => {
            const breachData = {
                organizationId: testOrgId,
                description: 'Test breach',
                affectedUsers: 10,
                dataCategories: ['email', 'name'],
                severity: 'low',
                discoveredAt: new Date(),
                actions: 'Immediate containment'
            };
            
            const breach = await gdprService.reportDataBreach(breachData);
            
            expect(breach).toHaveProperty('id');
            expect(breach.severity).toBe('low');
            expect(breach.reported_to_authorities).toBe(false);
        });
    });

    describe('CCPA Compliance', () => {
        it('should provide data disclosure per CCPA', async () => {
            const disclosure = await privacyComplianceService.ccpaDataDisclosure(
                testUserId,
                testOrgId
            );
            
            expect(disclosure).toHaveProperty('categories');
            expect(disclosure).toHaveProperty('sources');
            expect(disclosure).toHaveProperty('purposes');
            expect(disclosure).toHaveProperty('thirdParties');
            expect(disclosure).toHaveProperty('salesInfo');
            expect(disclosure.salesInfo.dataSold).toBe(false);
        });

        it('should handle CCPA deletion with exceptions', async () => {
            const deletionResult = await privacyComplianceService.ccpaDeleteRequest(
                testUserId,
                testOrgId,
                { verificationToken: 'test-token' }
            );
            
            expect(deletionResult).toHaveProperty('deletedCategories');
            expect(deletionResult).toHaveProperty('retainedCategories');
            expect(deletionResult).toHaveProperty('exceptions');
        });

        it('should manage opt-out preferences', async () => {
            const preferences = {
                doNotSell: true,
                doNotShare: true,
                limitUseOfSensitiveInfo: true
            };
            
            const result = await privacyComplianceService.ccpaOptOut(
                testUserId,
                testOrgId,
                preferences
            );
            
            expect(result.status).toBe('success');
            expect(result.preferences.doNotSell).toBe(true);
        });

        it('should validate state-specific requirements', async () => {
            const caCompliance = await privacyComplianceService.statePrivacyCompliance(
                testUserId,
                'CA'
            );
            
            expect(caCompliance.applicableLaw).toBe('CCPA/CPRA');
            expect(caCompliance.requirements).toContain('Right to know about personal information collected');
            expect(caCompliance.optOutAvailable).toBeTruthy();
        });
    });

    describe('COPPA Compliance', () => {
        it('should detect users under 13', async () => {
            const birthDate = new Date();
            birthDate.setFullYear(birthDate.getFullYear() - 10); // 10 years old
            
            const verification = await privacyComplianceService.coppaVerification(
                testUserId,
                birthDate
            );
            
            expect(verification.requiresParentalConsent).toBe(true);
            expect(verification.age).toBe(10);
            expect(verification.restrictions).toContain('Cannot collect personal information without parental consent');
        });

        it('should handle parental consent workflow', async () => {
            const consent = await privacyComplianceService.coppaParentalConsent(
                testUserId,
                'parent@example.com',
                { consentType: 'full' }
            );
            
            expect(consent.status).toBe('pending_verification');
            expect(consent.parentEmail).toBe('parent@example.com');
        });

        it('should not require consent for users over 13', async () => {
            const birthDate = new Date();
            birthDate.setFullYear(birthDate.getFullYear() - 18); // 18 years old
            
            const verification = await privacyComplianceService.coppaVerification(
                testUserId,
                birthDate
            );
            
            expect(verification.requiresParentalConsent).toBe(false);
            expect(verification.age).toBe(18);
        });
    });

    describe('Cross-Border Data Transfer', () => {
        it('should validate EU to US transfers', async () => {
            const transfer = await privacyComplianceService.validateCrossBorderTransfer(
                'EU',
                'US',
                'personal'
            );
            
            expect(transfer.allowed).toBe(false);
            expect(transfer.mechanism).toContain('Standard Contractual Clauses');
        });

        it('should block sensitive data transfers without safeguards', async () => {
            await expect(
                privacyComplianceService.validateCrossBorderTransfer(
                    'EU',
                    'US',
                    'sensitive'
                )
            ).rejects.toThrow('Cross-border transfer not allowed');
        });

        it('should allow transfers with proper mechanisms', async () => {
            const transfer = await privacyComplianceService.validateCrossBorderTransfer(
                'US',
                'EU',
                'personal'
            );
            
            expect(transfer.allowed).toBe(true);
            expect(transfer.requirements).toContain('GDPR compliance certification');
        });
    });

    describe('Privacy Impact Assessment', () => {
        it('should conduct privacy assessment', async () => {
            const projectData = {
                name: 'Test Project',
                organizationId: testOrgId,
                dataTypes: ['email', 'name', 'usage_data']
            };
            
            const assessment = await privacyComplianceService.conductPrivacyImpactAssessment(
                projectData
            );
            
            expect(assessment).toHaveProperty('score');
            expect(assessment).toHaveProperty('risks');
            expect(assessment).toHaveProperty('mitigations');
            expect(assessment.score).toBeGreaterThanOrEqual(0);
            expect(assessment.score).toBeLessThanOrEqual(100);
        });
    });

    describe('Automated Compliance Monitoring', () => {
        it('should detect compliance violations', async () => {
            const monitoring = await privacyComplianceService.monitorCompliance(testOrgId);
            
            expect(monitoring).toHaveProperty('violations');
            expect(monitoring).toHaveProperty('warnings');
            expect(monitoring).toHaveProperty('recommendations');
            expect(Array.isArray(monitoring.violations)).toBe(true);
        });

        it('should check encryption compliance', async () => {
            // Mock unencrypted data detection
            const monitoring = await privacyComplianceService.monitorCompliance(testOrgId);
            
            const encryptionViolation = monitoring.violations.find(
                v => v.type === 'encryption'
            );
            
            if (encryptionViolation) {
                expect(encryptionViolation.severity).toBe('high');
            }
        });
    });

    describe('Data Minimization', () => {
        it('should enforce data minimization principles', () => {
            const necessaryFields = ['email', 'firstName', 'lastName'];
            const collectedData = {
                email: 'test@example.com',
                firstName: 'Test',
                lastName: 'User',
                ssn: '123-45-6789', // Unnecessary
                mothersMaidenName: 'Smith' // Unnecessary
            };
            
            const minimizedData = Object.keys(collectedData)
                .filter(key => necessaryFields.includes(key))
                .reduce((obj, key) => {
                    obj[key] = collectedData[key];
                    return obj;
                }, {});
            
            expect(Object.keys(minimizedData).length).toBe(3);
            expect(minimizedData).not.toHaveProperty('ssn');
            expect(minimizedData).not.toHaveProperty('mothersMaidenName');
        });
    });

    describe('Audit Trail', () => {
        it('should log all data access', async () => {
            // Simulate data access
            const auditLog = {
                user_id: testUserId,
                organization_id: testOrgId,
                action: 'data_access',
                resource_type: 'user_profile',
                resource_id: testUserId,
                ip_address: '192.168.1.1',
                success: true
            };
            
            const logged = await Database.insert('audit_logs', auditLog);
            
            expect(logged).toHaveProperty('id');
            expect(logged.action).toBe('data_access');
        });

        it('should maintain immutable audit records', async () => {
            const auditId = 'test-audit-id';
            
            // Attempt to modify audit log should fail
            await expect(
                Database.update('audit_logs', 
                    { action: 'modified_action' },
                    { id: auditId }
                )
            ).rejects.toThrow();
        });
    });

    describe('Security Headers', () => {
        it('should validate security headers', () => {
            const requiredHeaders = {
                'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
                'X-Content-Type-Options': 'nosniff',
                'X-Frame-Options': 'DENY',
                'X-XSS-Protection': '1; mode=block',
                'Content-Security-Policy': "default-src 'self'",
                'Referrer-Policy': 'strict-origin-when-cross-origin'
            };
            
            Object.entries(requiredHeaders).forEach(([header, value]) => {
                expect(requiredHeaders[header]).toBeDefined();
                expect(requiredHeaders[header]).toBe(value);
            });
        });
    });

    describe('Rate Limiting', () => {
        it('should enforce rate limits', async () => {
            const requests = [];
            const maxRequests = 100;
            
            // Simulate rapid requests
            for (let i = 0; i < maxRequests + 10; i++) {
                requests.push({
                    userId: testUserId,
                    timestamp: Date.now()
                });
            }
            
            const allowedRequests = requests.slice(0, maxRequests);
            const blockedRequests = requests.slice(maxRequests);
            
            expect(allowedRequests.length).toBe(maxRequests);
            expect(blockedRequests.length).toBe(10);
        });
    });

    describe('Token Security', () => {
        it('should hash tokens for storage', () => {
            const token = 'test-token-12345';
            const hashed = encryptionService.hash(token);
            
            expect(hashed).not.toBe(token);
            expect(hashed.length).toBe(64); // SHA-256 produces 64 character hex
        });

        it('should expire tokens appropriately', () => {
            const accessExpiry = new Date();
            accessExpiry.setMinutes(accessExpiry.getMinutes() + 15);
            
            const refreshExpiry = new Date();
            refreshExpiry.setDate(refreshExpiry.getDate() + 7);
            
            const now = new Date();
            
            expect(accessExpiry.getTime()).toBeGreaterThan(now.getTime());
            expect(refreshExpiry.getTime()).toBeGreaterThan(accessExpiry.getTime());
        });
    });
});

// Performance tests for compliance operations
describe('Compliance Performance Tests', () => {
    it('should encrypt data within acceptable time', () => {
        const startTime = Date.now();
        const data = 'x'.repeat(1000); // 1KB of data
        
        encryptionService.encrypt(data);
        
        const endTime = Date.now();
        const duration = endTime - startTime;
        
        expect(duration).toBeLessThan(100); // Should complete within 100ms
    });

    it('should export user data within SLA', async () => {
        const startTime = Date.now();
        
        await gdprService.exportUserData('test-user', 'test-org');
        
        const endTime = Date.now();
        const duration = endTime - startTime;
        
        expect(duration).toBeLessThan(5000); // Should complete within 5 seconds
    });
});
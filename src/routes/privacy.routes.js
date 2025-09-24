const express = require('express');
const router = express.Router();
const { authenticate, requireRole, auditLog, rateLimit } = require('../middleware/auth.middleware');
const gdprService = require('../services/gdpr.service');
const privacyComplianceService = require('../services/privacy-compliance.service');
const encryptionService = require('../services/encryption.service');
const { Database } = require('../database/postgres');

/**
 * Privacy and Compliance API Routes
 * Handles GDPR, CCPA, and other privacy law requirements
 */

// =====================================================
// GDPR ENDPOINTS
// =====================================================

/**
 * @route GET /api/privacy/gdpr/export
 * @desc Export user data (GDPR Article 15 - Right to Access)
 * @access Private
 */
router.get('/gdpr/export',
    authenticate,
    rateLimit({ max: 5, windowMs: 24 * 60 * 60 * 1000 }), // 5 requests per day
    auditLog('gdpr_export', 'privacy'),
    async (req, res) => {
        try {
            const { userId, organizationId } = req.auth;
            
            const exportData = await gdprService.exportUserData(userId, organizationId);
            
            res.json({
                success: true,
                message: 'Data export initiated',
                exportId: exportData.exportId,
                expiresAt: exportData.expiresAt,
                downloadUrl: `/api/privacy/gdpr/download/${exportData.exportId}`
            });
        } catch (error) {
            console.error('GDPR export error:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to export data'
            });
        }
    }
);

/**
 * @route DELETE /api/privacy/gdpr/delete
 * @desc Delete user data (GDPR Article 17 - Right to Erasure)
 * @access Private
 */
router.delete('/gdpr/delete',
    authenticate,
    rateLimit({ max: 2, windowMs: 24 * 60 * 60 * 1000 }), // 2 requests per day
    auditLog('gdpr_deletion', 'privacy'),
    async (req, res) => {
        try {
            const { userId, organizationId } = req.auth;
            const { confirmDeletion, reason } = req.body;
            
            if (!confirmDeletion) {
                return res.status(400).json({
                    success: false,
                    error: 'Deletion must be explicitly confirmed'
                });
            }
            
            const result = await gdprService.deleteUserData(userId, organizationId, {
                reason: reason || 'User requested deletion',
                retainAnonymized: true,
                confirmDeletion: true
            });
            
            res.json({
                success: true,
                message: 'Data deletion completed',
                summary: result
            });
        } catch (error) {
            console.error('GDPR deletion error:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to delete data'
            });
        }
    }
);

/**
 * @route GET /api/privacy/gdpr/consent
 * @desc Get consent status
 * @access Private
 */
router.get('/gdpr/consent',
    authenticate,
    async (req, res) => {
        try {
            const { userId } = req.auth;
            
            const consentStatus = await gdprService.getConsentStatus(userId);
            
            res.json({
                success: true,
                consents: consentStatus
            });
        } catch (error) {
            console.error('Consent retrieval error:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to retrieve consent status'
            });
        }
    }
);

/**
 * @route POST /api/privacy/gdpr/consent
 * @desc Update consent preferences
 * @access Private
 */
router.post('/gdpr/consent',
    authenticate,
    auditLog('consent_update', 'privacy'),
    async (req, res) => {
        try {
            const { userId } = req.auth;
            const consents = {
                ...req.body,
                ipAddress: req.ip,
                userAgent: req.headers['user-agent']
            };
            
            await gdprService.updateConsent(userId, consents);
            
            res.json({
                success: true,
                message: 'Consent preferences updated'
            });
        } catch (error) {
            console.error('Consent update error:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to update consent'
            });
        }
    }
);

// =====================================================
// CCPA ENDPOINTS
// =====================================================

/**
 * @route GET /api/privacy/ccpa/disclosure
 * @desc Get data disclosure (CCPA Right to Know)
 * @access Private
 */
router.get('/ccpa/disclosure',
    authenticate,
    rateLimit({ max: 5, windowMs: 24 * 60 * 60 * 1000 }),
    auditLog('ccpa_disclosure', 'privacy'),
    async (req, res) => {
        try {
            const { userId, organizationId } = req.auth;
            
            const disclosure = await privacyComplianceService.ccpaDataDisclosure(
                userId,
                organizationId
            );
            
            res.json({
                success: true,
                disclosure
            });
        } catch (error) {
            console.error('CCPA disclosure error:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to generate disclosure'
            });
        }
    }
);

/**
 * @route DELETE /api/privacy/ccpa/delete
 * @desc Delete personal information (CCPA Right to Delete)
 * @access Private
 */
router.delete('/ccpa/delete',
    authenticate,
    rateLimit({ max: 2, windowMs: 24 * 60 * 60 * 1000 }),
    auditLog('ccpa_deletion', 'privacy'),
    async (req, res) => {
        try {
            const { userId, organizationId } = req.auth;
            const { verificationToken } = req.body;
            
            const result = await privacyComplianceService.ccpaDeleteRequest(
                userId,
                organizationId,
                { verificationToken }
            );
            
            res.json({
                success: true,
                message: 'CCPA deletion completed',
                result
            });
        } catch (error) {
            console.error('CCPA deletion error:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to process deletion request'
            });
        }
    }
);

/**
 * @route POST /api/privacy/ccpa/opt-out
 * @desc Opt-out of data sale/sharing (CCPA Right to Opt-Out)
 * @access Private
 */
router.post('/ccpa/opt-out',
    authenticate,
    auditLog('ccpa_opt_out', 'privacy'),
    async (req, res) => {
        try {
            const { userId, organizationId } = req.auth;
            const preferences = req.body;
            
            const result = await privacyComplianceService.ccpaOptOut(
                userId,
                organizationId,
                preferences
            );
            
            res.json({
                success: true,
                message: 'Opt-out preferences updated',
                result
            });
        } catch (error) {
            console.error('CCPA opt-out error:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to update opt-out preferences'
            });
        }
    }
);

// =====================================================
// COPPA ENDPOINTS
// =====================================================

/**
 * @route POST /api/privacy/coppa/verify-age
 * @desc Verify user age for COPPA compliance
 * @access Public
 */
router.post('/coppa/verify-age',
    async (req, res) => {
        try {
            const { userId, birthDate } = req.body;
            
            const verification = await privacyComplianceService.coppaVerification(
                userId,
                birthDate
            );
            
            res.json({
                success: true,
                verification
            });
        } catch (error) {
            console.error('COPPA verification error:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to verify age'
            });
        }
    }
);

/**
 * @route POST /api/privacy/coppa/parental-consent
 * @desc Request parental consent for child user
 * @access Private
 */
router.post('/coppa/parental-consent',
    authenticate,
    async (req, res) => {
        try {
            const { childUserId, parentEmail, consentData } = req.body;
            
            const result = await privacyComplianceService.coppaParentalConsent(
                childUserId,
                parentEmail,
                consentData
            );
            
            res.json({
                success: true,
                message: 'Parental consent request sent',
                result
            });
        } catch (error) {
            console.error('Parental consent error:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to process parental consent'
            });
        }
    }
);

// =====================================================
// GENERAL PRIVACY ENDPOINTS
// =====================================================

/**
 * @route GET /api/privacy/rights
 * @desc Get user privacy rights based on location
 * @access Private
 */
router.get('/rights',
    authenticate,
    async (req, res) => {
        try {
            const { userId } = req.auth;
            const { state, country } = req.query;
            
            let rights = {};
            
            if (country === 'US' && state) {
                rights = await privacyComplianceService.statePrivacyCompliance(userId, state);
            } else if (country === 'EU') {
                rights = {
                    law: 'GDPR',
                    rights: [
                        'Right to Access',
                        'Right to Rectification',
                        'Right to Erasure',
                        'Right to Restrict Processing',
                        'Right to Data Portability',
                        'Right to Object',
                        'Rights related to automated decision making'
                    ]
                };
            }
            
            res.json({
                success: true,
                rights
            });
        } catch (error) {
            console.error('Rights retrieval error:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to retrieve privacy rights'
            });
        }
    }
);

/**
 * @route POST /api/privacy/assessment
 * @desc Conduct privacy impact assessment
 * @access Private - Admin only
 */
router.post('/assessment',
    authenticate,
    requireRole(['admin', 'owner']),
    auditLog('privacy_assessment', 'privacy'),
    async (req, res) => {
        try {
            const projectData = {
                ...req.body,
                organizationId: req.auth.organizationId
            };
            
            const assessment = await privacyComplianceService.conductPrivacyImpactAssessment(
                projectData
            );
            
            res.json({
                success: true,
                assessment
            });
        } catch (error) {
            console.error('Privacy assessment error:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to conduct privacy assessment'
            });
        }
    }
);

/**
 * @route GET /api/privacy/compliance-status
 * @desc Get organization compliance status
 * @access Private - Admin only
 */
router.get('/compliance-status',
    authenticate,
    requireRole(['admin', 'owner']),
    async (req, res) => {
        try {
            const { organizationId } = req.auth;
            
            const monitoring = await privacyComplianceService.monitorCompliance(organizationId);
            
            res.json({
                success: true,
                compliance: monitoring
            });
        } catch (error) {
            console.error('Compliance monitoring error:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to retrieve compliance status'
            });
        }
    }
);

/**
 * @route POST /api/privacy/breach-report
 * @desc Report a data breach
 * @access Private - Admin only
 */
router.post('/breach-report',
    authenticate,
    requireRole(['admin', 'owner']),
    auditLog('breach_report', 'privacy'),
    async (req, res) => {
        try {
            const breachData = {
                ...req.body,
                organizationId: req.auth.organizationId
            };
            
            const breach = await gdprService.reportDataBreach(breachData);
            
            res.json({
                success: true,
                message: 'Breach reported successfully',
                breach
            });
        } catch (error) {
            console.error('Breach reporting error:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to report breach'
            });
        }
    }
);

/**
 * @route POST /api/privacy/cross-border-transfer
 * @desc Validate cross-border data transfer
 * @access Private - Admin only
 */
router.post('/cross-border-transfer',
    authenticate,
    requireRole(['admin', 'owner']),
    auditLog('cross_border_transfer', 'privacy'),
    async (req, res) => {
        try {
            const { fromCountry, toCountry, dataType } = req.body;
            
            const validation = await privacyComplianceService.validateCrossBorderTransfer(
                fromCountry,
                toCountry,
                dataType
            );
            
            res.json({
                success: true,
                validation
            });
        } catch (error) {
            console.error('Cross-border validation error:', error);
            res.status(500).json({
                success: false,
                error: error.message || 'Failed to validate transfer'
            });
        }
    }
);

/**
 * @route GET /api/privacy/data-processing-activities
 * @desc Get data processing activities record
 * @access Private - Admin only
 */
router.get('/data-processing-activities',
    authenticate,
    requireRole(['admin', 'owner']),
    async (req, res) => {
        try {
            const { organizationId } = req.auth;
            
            const activities = await gdprService.getDataProcessingActivities(organizationId);
            
            res.json({
                success: true,
                activities
            });
        } catch (error) {
            console.error('Data processing activities error:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to retrieve data processing activities'
            });
        }
    }
);

/**
 * @route GET /api/privacy/privacy-report
 * @desc Generate comprehensive privacy report
 * @access Private - Admin only
 */
router.get('/privacy-report',
    authenticate,
    requireRole(['admin', 'owner']),
    auditLog('privacy_report_generated', 'privacy'),
    async (req, res) => {
        try {
            const { organizationId } = req.auth;
            
            const report = await gdprService.generatePrivacyReport(organizationId);
            
            res.json({
                success: true,
                report
            });
        } catch (error) {
            console.error('Privacy report error:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to generate privacy report'
            });
        }
    }
);

module.exports = router;
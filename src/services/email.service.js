const nodemailer = require('nodemailer');
const { logger } = require('../database/postgres');
require('dotenv').config();

class EmailService {
    constructor() {
        // In production, use a real email service like SendGrid, AWS SES, etc.
        this.transporter = process.env.SMTP_HOST ? nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT || '587'),
            secure: process.env.SMTP_PORT === '465',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        }) : null;

        this.fromEmail = process.env.EMAIL_FROM || 'noreply@scaleops6.com';
        this.appUrl = process.env.APP_URL || 'http://localhost:3000';
    }

    /**
     * Send email
     * @param {Object} options - Email options
     * @returns {Promise<void>}
     */
    async sendEmail(options) {
        const { to, subject, html, text } = options;

        if (!this.transporter) {
            // Log email in development mode
            logger.info('Email would be sent:', {
                to,
                subject,
                preview: text?.substring(0, 100)
            });
            return;
        }

        try {
            const info = await this.transporter.sendMail({
                from: this.fromEmail,
                to,
                subject,
                text,
                html
            });

            logger.info('Email sent successfully:', {
                messageId: info.messageId,
                to
            });
        } catch (error) {
            logger.error('Failed to send email:', error);
            throw error;
        }
    }

    /**
     * Send verification email
     * @param {string} email - User email
     * @param {string} firstName - User first name
     * @param {string} token - Verification token
     */
    async sendVerificationEmail(email, firstName, token) {
        const verificationUrl = `${this.appUrl}/verify-email?token=${token}`;
        
        const subject = 'Verify your ScaleOps6 account';
        
        const html = `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
                    .button { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
                    .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>Welcome to ScaleOps6!</h1>
                    </div>
                    <div class="content">
                        <h2>Hi ${firstName},</h2>
                        <p>Thank you for signing up for ScaleOps6. Please verify your email address to complete your registration.</p>
                        <p style="text-align: center;">
                            <a href="${verificationUrl}" class="button">Verify Email Address</a>
                        </p>
                        <p>Or copy and paste this link into your browser:</p>
                        <p style="word-break: break-all; background: #fff; padding: 10px; border-radius: 5px;">
                            ${verificationUrl}
                        </p>
                        <p>This link will expire in 24 hours.</p>
                        <p>If you didn't create an account with ScaleOps6, please ignore this email.</p>
                    </div>
                    <div class="footer">
                        <p>© 2024 ScaleOps6. All rights reserved.</p>
                        <p>This is an automated message, please do not reply.</p>
                    </div>
                </div>
            </body>
            </html>
        `;

        const text = `
            Hi ${firstName},

            Thank you for signing up for ScaleOps6. Please verify your email address by clicking the link below:

            ${verificationUrl}

            This link will expire in 24 hours.

            If you didn't create an account with ScaleOps6, please ignore this email.

            Best regards,
            The ScaleOps6 Team
        `;

        await this.sendEmail({
            to: email,
            subject,
            html,
            text
        });
    }

    /**
     * Send password reset email
     * @param {string} email - User email
     * @param {string} firstName - User first name
     * @param {string} token - Reset token
     */
    async sendPasswordResetEmail(email, firstName, token) {
        const resetUrl = `${this.appUrl}/reset-password?token=${token}`;
        
        const subject = 'Reset your ScaleOps6 password';
        
        const html = `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
                    .button { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
                    .warning { background: #fff3cd; border: 1px solid #ffc107; padding: 10px; border-radius: 5px; margin: 20px 0; }
                    .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>Password Reset Request</h1>
                    </div>
                    <div class="content">
                        <h2>Hi ${firstName},</h2>
                        <p>We received a request to reset your ScaleOps6 password. Click the button below to create a new password:</p>
                        <p style="text-align: center;">
                            <a href="${resetUrl}" class="button">Reset Password</a>
                        </p>
                        <p>Or copy and paste this link into your browser:</p>
                        <p style="word-break: break-all; background: #fff; padding: 10px; border-radius: 5px;">
                            ${resetUrl}
                        </p>
                        <div class="warning">
                            <strong>⚠️ Important:</strong> This link will expire in 1 hour for security reasons.
                        </div>
                        <p>If you didn't request a password reset, please ignore this email. Your password will remain unchanged.</p>
                        <p>For security reasons, we recommend that you:</p>
                        <ul>
                            <li>Use a strong, unique password</li>
                            <li>Enable two-factor authentication</li>
                            <li>Never share your password with anyone</li>
                        </ul>
                    </div>
                    <div class="footer">
                        <p>© 2024 ScaleOps6. All rights reserved.</p>
                        <p>This is an automated message, please do not reply.</p>
                    </div>
                </div>
            </body>
            </html>
        `;

        const text = `
            Hi ${firstName},

            We received a request to reset your ScaleOps6 password. Click the link below to create a new password:

            ${resetUrl}

            This link will expire in 1 hour for security reasons.

            If you didn't request a password reset, please ignore this email. Your password will remain unchanged.

            Best regards,
            The ScaleOps6 Team
        `;

        await this.sendEmail({
            to: email,
            subject,
            html,
            text
        });
    }

    /**
     * Send welcome email after successful registration
     * @param {string} email - User email
     * @param {string} firstName - User first name
     * @param {string} organizationName - Organization name
     */
    async sendWelcomeEmail(email, firstName, organizationName) {
        const dashboardUrl = `${this.appUrl}/dashboard`;
        
        const subject = 'Welcome to ScaleOps6 - Let\'s get started!';
        
        const html = `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
                    .button { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
                    .feature { background: white; padding: 15px; margin: 10px 0; border-radius: 5px; border-left: 4px solid #667eea; }
                    .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>Welcome to ScaleOps6! 🚀</h1>
                    </div>
                    <div class="content">
                        <h2>Hi ${firstName},</h2>
                        <p>Congratulations! Your organization <strong>${organizationName}</strong> has been successfully created on ScaleOps6.</p>
                        
                        <p>You now have access to the complete GTM Maturity Platform. Here's what you can do:</p>
                        
                        <div class="feature">
                            <strong>📊 Track GTM Progress</strong>
                            <p>Monitor your progress across 16 critical GTM blocks and 96 subcomponents.</p>
                        </div>
                        
                        <div class="feature">
                            <strong>🤖 AI-Powered Analysis</strong>
                            <p>Get expert insights and recommendations from our specialized AI agents.</p>
                        </div>
                        
                        <div class="feature">
                            <strong>📈 Generate Reports</strong>
                            <p>Create comprehensive reports to share with stakeholders and investors.</p>
                        </div>
                        
                        <div class="feature">
                            <strong>👥 Collaborate with Your Team</strong>
                            <p>Invite team members and work together on your GTM strategy.</p>
                        </div>
                        
                        <p style="text-align: center;">
                            <a href="${dashboardUrl}" class="button">Go to Dashboard</a>
                        </p>
                        
                        <p><strong>Your 14-day trial has started!</strong> Explore all features and see how ScaleOps6 can accelerate your go-to-market success.</p>
                        
                        <p>Need help getting started? Check out our <a href="${this.appUrl}/docs">documentation</a> or <a href="${this.appUrl}/support">contact support</a>.</p>
                    </div>
                    <div class="footer">
                        <p>© 2024 ScaleOps6. All rights reserved.</p>
                        <p>You're receiving this because you signed up for ScaleOps6.</p>
                    </div>
                </div>
            </body>
            </html>
        `;

        const text = `
            Hi ${firstName},

            Congratulations! Your organization ${organizationName} has been successfully created on ScaleOps6.

            You now have access to the complete GTM Maturity Platform:
            - Track GTM Progress across 16 blocks
            - Get AI-Powered Analysis
            - Generate comprehensive reports
            - Collaborate with your team

            Go to your dashboard: ${dashboardUrl}

            Your 14-day trial has started! Explore all features and see how ScaleOps6 can accelerate your go-to-market success.

            Best regards,
            The ScaleOps6 Team
        `;

        await this.sendEmail({
            to: email,
            subject,
            html,
            text
        });
    }

    /**
     * Send organization invitation email
     * @param {string} email - Invitee email
     * @param {string} inviterName - Name of person sending invite
     * @param {string} organizationName - Organization name
     * @param {string} token - Invitation token
     */
    async sendInvitationEmail(email, inviterName, organizationName, token) {
        const inviteUrl = `${this.appUrl}/accept-invite?token=${token}`;
        
        const subject = `You're invited to join ${organizationName} on ScaleOps6`;
        
        const html = `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
                    .button { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
                    .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>You're Invited! 🎉</h1>
                    </div>
                    <div class="content">
                        <h2>Join ${organizationName} on ScaleOps6</h2>
                        <p><strong>${inviterName}</strong> has invited you to collaborate on ScaleOps6, the GTM Maturity Platform.</p>
                        
                        <p>ScaleOps6 helps teams:</p>
                        <ul>
                            <li>Track and improve GTM maturity</li>
                            <li>Get AI-powered insights and recommendations</li>
                            <li>Generate comprehensive reports</li>
                            <li>Collaborate on go-to-market strategy</li>
                        </ul>
                        
                        <p style="text-align: center;">
                            <a href="${inviteUrl}" class="button">Accept Invitation</a>
                        </p>
                        
                        <p>Or copy and paste this link into your browser:</p>
                        <p style="word-break: break-all; background: #fff; padding: 10px; border-radius: 5px;">
                            ${inviteUrl}
                        </p>
                        
                        <p><em>This invitation will expire in 7 days.</em></p>
                    </div>
                    <div class="footer">
                        <p>© 2024 ScaleOps6. All rights reserved.</p>
                        <p>You received this invitation from ${inviterName} at ${organizationName}.</p>
                    </div>
                </div>
            </body>
            </html>
        `;

        const text = `
            Join ${organizationName} on ScaleOps6

            ${inviterName} has invited you to collaborate on ScaleOps6, the GTM Maturity Platform.

            Accept invitation: ${inviteUrl}

            This invitation will expire in 7 days.

            Best regards,
            The ScaleOps6 Team
        `;

        await this.sendEmail({
            to: email,
            subject,
            html,
            text
        });
    }
}

// Export singleton instance
module.exports = new EmailService();
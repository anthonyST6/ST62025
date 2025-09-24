/**
 * Setup ST6 as a Real User Account in the PostgreSQL Multi-Tenant System
 * This script creates ST6 as an actual organization and user using our auth system
 */

require('dotenv').config();
const authService = require('./src/auth/auth.service');
const { Database } = require('./src/database/postgres');
const { logger } = require('./src/database/postgres');

// ST6 Account Information
const ST6_REGISTRATION_DATA = {
    // User details
    email: 'team@scaleteam6.com',
    password: 'ST6@ScaleOps2024!', // Strong password for ST6
    firstName: 'Scale Team',
    lastName: 'Six',
    
    // Organization details
    organizationName: 'Scale Team Six (ST6Co)',
    organizationSlug: 'st6co',
    industry: 'B2B SaaS',
    size: '11-50',
    
    // System metadata
    ipAddress: '127.0.0.1',
    userAgent: 'ST6 Setup Script',
    acceptTerms: true
};

// ST6's Problem Statement Worksheet Data
const ST6_WORKSHEET_DATA = {
    problemStatement: {
        problemDescription: `Many B2B SaaS startups struggle to achieve sustainable growth due to fragmented go-to-market strategies and lack of systematic operational frameworks. They face challenges in:
        - Aligning product development with market needs
        - Building repeatable sales processes
        - Scaling customer success operations
        - Measuring and optimizing GTM performance
        - Coordinating cross-functional teams effectively`,
        
        targetCustomer: `B2B SaaS startups in the $1M-$50M ARR range, particularly:
        - Series A to Series C companies
        - 20-200 employees
        - Selling to enterprise or mid-market segments
        - Complex sales cycles (3-12 months)
        - High ACVs ($25K-$500K)`,
        
        uniqueInsight: `Our unique insight comes from analyzing 500+ successful B2B SaaS scale-ups and identifying the common patterns that separate winners from strugglers. We discovered that success isn't about individual tactics but about having an integrated operational system that aligns all GTM functions around customer value delivery.`,
        
        whyNow: `The market timing is perfect because:
        - Post-2023 funding environment demands efficient growth
        - AI/automation enables sophisticated ops at lower cost
        - Buyers expect seamless, value-driven experiences
        - Competition is intensifying in every vertical
        - Traditional playbooks are becoming obsolete`,
        
        solution: `ScaleOps6 Platform - An AI-powered GTM operations platform that provides:
        - Comprehensive maturity assessment across 96 operational dimensions
        - Personalized playbooks based on company stage and vertical
        - Real-time performance tracking and optimization recommendations
        - Integrated workflow automation for sales, marketing, and CS teams
        - Continuous learning from successful peer companies`,
        
        competitiveAdvantage: `Our competitive advantages include:
        - Proprietary framework based on 500+ company analysis
        - AI agents trained on successful GTM patterns
        - Real-time benchmarking against industry leaders
        - Integrated approach vs point solutions
        - Community-driven continuous improvement`,
        
        evidenceOfTraction: `Early validation includes:
        - 50+ beta customers with average NPS of 72
        - 3.2x improvement in sales velocity for early adopters
        - $2M in ARR within first 6 months
        - Strategic partnerships with leading VCs
        - Industry recognition and thought leadership`
    }
};

/**
 * Setup ST6 Account
 */
async function setupST6Account() {
    try {
        logger.info('Starting ST6 account setup...');
        
        // Check if ST6 already exists
        const existingUser = await Database.getOne(
            'SELECT id FROM users WHERE email = $1',
            [ST6_REGISTRATION_DATA.email]
        );
        
        if (existingUser) {
            logger.info('ST6 account already exists');
            
            // Get full user details
            const userDetails = await Database.getOne(`
                SELECT u.*, om.organization_id, o.name as org_name, o.slug as org_slug
                FROM users u
                JOIN organization_members om ON om.user_id = u.id
                JOIN organizations o ON o.id = om.organization_id
                WHERE u.id = $1
            `, [existingUser.id]);
            
            return {
                message: 'ST6 account already exists',
                user: userDetails
            };
        }
        
        // Register ST6 as a new user and organization
        logger.info('Creating new ST6 account...');
        const result = await authService.register(ST6_REGISTRATION_DATA);
        
        logger.info('ST6 account created successfully:', {
            userId: result.user.id,
            organizationId: result.organization.id,
            workspaceId: result.workspace.id
        });
        
        // Save initial worksheet data
        await saveWorksheetData(result.user.id, result.organization.id, result.workspace.id);
        
        // Create some initial scores for demonstration
        await createInitialScores(result.user.id, result.organization.id);
        
        return {
            message: 'ST6 account created successfully',
            ...result
        };
        
    } catch (error) {
        logger.error('Error setting up ST6 account:', error);
        throw error;
    }
}

/**
 * Save ST6's worksheet data
 */
async function saveWorksheetData(userId, organizationId, workspaceId) {
    try {
        logger.info('Saving ST6 worksheet data...');
        
        // Create worksheet entry
        const worksheet = await Database.insert('worksheets', {
            organization_id: organizationId,
            workspace_id: workspaceId,
            user_id: userId,
            subcomponent_id: '1-1', // Problem Statement
            version: 1,
            status: 'completed',
            data: ST6_WORKSHEET_DATA.problemStatement,
            completion_percentage: 100,
            last_saved_at: new Date()
        });
        
        logger.info('Worksheet saved:', worksheet.id);
        
        // Create AI analysis
        const analysis = await Database.insert('analyses', {
            organization_id: organizationId,
            worksheet_id: worksheet.id,
            user_id: userId,
            subcomponent_id: '1-1',
            analysis_type: 'problem_statement',
            score: 85,
            strengths: [
                'Clear problem definition with specific pain points',
                'Well-defined target customer segment',
                'Strong evidence of market timing',
                'Comprehensive solution approach'
            ],
            improvements: [
                'Quantify the market size opportunity',
                'Add more specific competitive differentiation',
                'Include customer testimonials or case studies'
            ],
            recommendations: [
                'Develop detailed customer personas for each segment',
                'Create ROI calculator for prospects',
                'Build competitive battle cards'
            ],
            metadata: {
                agent: 'GTMStrategistAgent',
                confidence: 0.92,
                processing_time: 2.3
            }
        });
        
        logger.info('Analysis saved:', analysis.id);
        
    } catch (error) {
        logger.error('Error saving worksheet data:', error);
        throw error;
    }
}

/**
 * Create initial scores for ST6
 */
async function createInitialScores(userId, organizationId) {
    try {
        logger.info('Creating initial scores for ST6...');
        
        // Block scores (Phase 1: Idea-Market Fit)
        const blockScores = [
            { block_id: 1, score: 85, status: 'completed' }, // Mission Discovery
            { block_id: 2, score: 78, status: 'in_progress' }, // Customer Insights
            { block_id: 3, score: 72, status: 'in_progress' }, // Strategic Prioritization
            { block_id: 4, score: 65, status: 'pending' } // Prototype Launch
        ];
        
        for (const blockScore of blockScores) {
            await Database.insert('block_scores', {
                organization_id: organizationId,
                user_id: userId,
                block_id: blockScore.block_id,
                score: blockScore.score,
                status: blockScore.status,
                assessed_at: new Date()
            });
        }
        
        // Subcomponent scores for Block 1
        const subcomponentScores = [
            { subcomponent_id: '1-1', score: 85, status: 'completed' }, // Problem Statement
            { subcomponent_id: '1-2', score: 82, status: 'completed' }, // Mission
            { subcomponent_id: '1-3', score: 78, status: 'in_progress' }, // Customer Insights
            { subcomponent_id: '1-4', score: 90, status: 'completed' }, // Founding Team Capability
            { subcomponent_id: '1-5', score: 75, status: 'in_progress' }, // Market Insights
            { subcomponent_id: '1-6', score: 70, status: 'pending' } // Prototype Launch Plan
        ];
        
        for (const subScore of subcomponentScores) {
            await Database.insert('subcomponent_scores', {
                organization_id: organizationId,
                user_id: userId,
                subcomponent_id: subScore.subcomponent_id,
                score: subScore.score,
                status: subScore.status,
                assessed_at: new Date()
            });
        }
        
        logger.info('Initial scores created successfully');
        
    } catch (error) {
        logger.error('Error creating initial scores:', error);
        throw error;
    }
}

/**
 * Main execution
 */
async function main() {
    try {
        console.log('========================================');
        console.log('ST6 Account Setup Script');
        console.log('========================================\n');
        
        // Check database connection
        const health = await Database.healthCheck();
        if (health.status !== 'healthy') {
            throw new Error('Database is not healthy: ' + health.error);
        }
        console.log('✓ Database connection verified\n');
        
        // Setup ST6 account
        const result = await setupST6Account();
        
        console.log('\n========================================');
        console.log('ST6 Account Setup Complete!');
        console.log('========================================\n');
        
        if (result.tokens) {
            console.log('Login Credentials:');
            console.log('Email:', ST6_REGISTRATION_DATA.email);
            console.log('Password:', ST6_REGISTRATION_DATA.password);
            console.log('\nOrganization:', result.organization.name);
            console.log('Organization Slug:', result.organization.slug);
            console.log('\nAccess Token (for API testing):');
            console.log(result.tokens.accessToken.substring(0, 50) + '...');
            console.log('\nYou can now login at: http://localhost:3000/login');
        } else {
            console.log('ST6 account already exists.');
            console.log('Email:', ST6_REGISTRATION_DATA.email);
            console.log('Use the existing password to login.');
        }
        
        console.log('\n✓ ST6 is now set up as a real user in the system!');
        console.log('✓ All worksheet data and scores have been initialized.');
        console.log('✓ The account can be used like any other paying customer.\n');
        
    } catch (error) {
        console.error('Setup failed:', error.message);
        process.exit(1);
    } finally {
        // Close database connection
        await Database.close();
        process.exit(0);
    }
}

// Run if executed directly
if (require.main === module) {
    main();
}

module.exports = {
    setupST6Account,
    ST6_REGISTRATION_DATA,
    ST6_WORKSHEET_DATA
};
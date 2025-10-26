/**
 * Firebase Admin SDK Configuration
 * 
 * Project: LOGIN
 * Project ID: login-df66c
 * Project Number: 146663369589
 * 
 * This module initializes Firebase Admin SDK for server-side authentication
 * and user management operations.
 */

const admin = require('firebase-admin');
const path = require('path');

let firebaseApp = null;

/**
 * Initialize Firebase Admin SDK
 * 
 * @param {Object} serviceAccountKey - Optional service account credentials
 * @returns {Object} Firebase Admin instance
 */
function initializeFirebase(serviceAccountKey = null) {
    if (firebaseApp) {
        console.log('✅ Firebase already initialized');
        return firebaseApp;
    }

    try {
        let credential;

        if (serviceAccountKey) {
            // Use provided service account
            credential = admin.credential.cert(serviceAccountKey);
        } else {
            // Try to load from file
            try {
                const serviceAccount = require('./firebase-service-account.json');
                credential = admin.credential.cert(serviceAccount);
                console.log('✅ Loaded Firebase credentials from file');
            } catch (fileError) {
                // Fallback to environment variables
                if (process.env.FIREBASE_PROJECT_ID) {
                    credential = admin.credential.cert({
                        projectId: process.env.FIREBASE_PROJECT_ID,
                        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
                    });
                    console.log('✅ Loaded Firebase credentials from environment');
                } else {
                    console.warn('⚠️ No Firebase credentials found. Using application default credentials.');
                    credential = admin.credential.applicationDefault();
                }
            }
        }

        firebaseApp = admin.initializeApp({
            credential: credential,
            projectId: 'login-df66c'
        });

        console.log('🔥 Firebase Admin SDK initialized successfully');
        console.log('   Project ID: login-df66c');
        
        return firebaseApp;
    } catch (error) {
        console.error('❌ Failed to initialize Firebase:', error);
        throw error;
    }
}

/**
 * Get Firebase Admin instance
 * 
 * @returns {Object} Firebase Admin instance
 */
function getFirebaseAdmin() {
    if (!firebaseApp) {
        initializeFirebase();
    }
    return admin;
}

/**
 * Verify Firebase ID token
 * 
 * @param {string} idToken - Firebase ID token from client
 * @returns {Promise<Object>} Decoded token with user info
 */
async function verifyIdToken(idToken) {
    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        return {
            success: true,
            uid: decodedToken.uid,
            email: decodedToken.email,
            emailVerified: decodedToken.email_verified,
            customClaims: decodedToken.customClaims || {}
        };
    } catch (error) {
        console.error('Token verification failed:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

/**
 * Set custom claims for a user (for role-based access)
 * 
 * @param {string} uid - Firebase user UID
 * @param {Object} claims - Custom claims to set (e.g., { role: 'admin', tier: 1 })
 * @returns {Promise<Object>} Result
 */
async function setCustomClaims(uid, claims) {
    try {
        await admin.auth().setCustomUserClaims(uid, claims);
        return {
            success: true,
            message: 'Custom claims set successfully'
        };
    } catch (error) {
        console.error('Failed to set custom claims:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

/**
 * Get user by UID
 * 
 * @param {string} uid - Firebase user UID
 * @returns {Promise<Object>} User record
 */
async function getUserByUid(uid) {
    try {
        const userRecord = await admin.auth().getUser(uid);
        return {
            success: true,
            user: userRecord
        };
    } catch (error) {
        console.error('Failed to get user:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

/**
 * Create a new Firebase user
 * 
 * @param {Object} userData - User data (email, password, displayName)
 * @returns {Promise<Object>} Created user record
 */
async function createFirebaseUser(userData) {
    try {
        const userRecord = await admin.auth().createUser({
            email: userData.email,
            password: userData.password,
            displayName: userData.displayName || userData.fullName,
            emailVerified: false
        });

        return {
            success: true,
            uid: userRecord.uid,
            user: userRecord
        };
    } catch (error) {
        console.error('Failed to create user:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

/**
 * Delete a Firebase user
 * 
 * @param {string} uid - Firebase user UID
 * @returns {Promise<Object>} Result
 */
async function deleteFirebaseUser(uid) {
    try {
        await admin.auth().deleteUser(uid);
        return {
            success: true,
            message: 'User deleted successfully'
        };
    } catch (error) {
        console.error('Failed to delete user:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

/**
 * Generate password reset link
 * 
 * @param {string} email - User email
 * @returns {Promise<Object>} Reset link
 */
async function generatePasswordResetLink(email) {
    try {
        const link = await admin.auth().generatePasswordResetLink(email);
        return {
            success: true,
            link: link
        };
    } catch (error) {
        console.error('Failed to generate reset link:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

module.exports = {
    initializeFirebase,
    getFirebaseAdmin,
    verifyIdToken,
    setCustomClaims,
    getUserByUid,
    createFirebaseUser,
    deleteFirebaseUser,
    generatePasswordResetLink
};
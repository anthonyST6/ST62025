/**
 * Create Test Users in Firebase and SQLite
 * 
 * This script creates demo users for testing the admin dashboard
 * Users will appear in both Firebase Console and SQLite database
 */

const { initializeFirebase, createFirebaseUser, setCustomClaims } = require('./firebase-config');
const DatabaseService = require('./database-service');

// Initialize Firebase
initializeFirebase();

const testUsers = [
    {
        email: 'admin@scaleops6.com',
        password: 'Admin123!',
        fullName: 'System Administrator',
        company: 'ScaleOps6',
        role: 'admin',
        tier: 3
    },
    {
        email: 'john@techstart.com',
        password: 'User123!',
        fullName: 'John Doe',
        company: 'TechStart Inc.',
        role: 'user',
        tier: 1
    },
    {
        email: 'jane@venturecap.com',
        password: 'VC123!',
        fullName: 'Jane Smith',
        company: 'Venture Capital Partners',
        role: 'vc',
        tier: 2
    },
    {
        email: 'mike@st6.com',
        password: 'Partner123!',
        fullName: 'Mike Johnson',
        company: 'ScaleTeam6',
        role: 'st6_partner',
        tier: 3
    },
    {
        email: 'sarah@startup.io',
        password: 'User123!',
        fullName: 'Sarah Williams',
        company: 'Startup.io',
        role: 'user',
        tier: 0
    }
];

async function createTestUsers() {
    console.log('🚀 Creating test users in Firebase and SQLite...\n');
    
    const db = new DatabaseService();
    const results = [];

    for (const userData of testUsers) {
        try {
            console.log(`📝 Creating user: ${userData.email}`);
            
            // 1. Create user in Firebase
            const firebaseResult = await createFirebaseUser({
                email: userData.email,
                password: userData.password,
                displayName: userData.fullName
            });

            if (!firebaseResult.success) {
                console.error(`  ❌ Firebase creation failed: ${firebaseResult.error}`);
                
                // Check if user already exists
                if (firebaseResult.error.includes('already exists')) {
                    console.log(`  ⚠️ User already exists in Firebase, skipping...`);
                }
                continue;
            }

            const firebaseUid = firebaseResult.uid;
            console.log(`  ✅ Created in Firebase (UID: ${firebaseUid})`);

            // 2. Set custom claims for role
            await setCustomClaims(firebaseUid, {
                role: userData.role,
                tier: userData.tier
            });
            console.log(`  ✅ Set custom claims (role: ${userData.role}, tier: ${userData.tier})`);

            // 3. Create user in SQLite
            const dbResult = await db.createUser({
                firebaseUid: firebaseUid,
                email: userData.email,
                fullName: userData.fullName,
                role: userData.role,
                tier: userData.tier,
                subscriptionStatus: userData.tier > 0 ? 'paid' : 'free',
                metadata: JSON.stringify({ company: userData.company })
            });

            console.log(`  ✅ Created in SQLite (ID: ${dbResult.userId})`);
            console.log(`  🎉 User ${userData.email} created successfully!\n`);

            results.push({
                email: userData.email,
                firebaseUid: firebaseUid,
                sqliteId: dbResult.userId,
                role: userData.role,
                tier: userData.tier,
                success: true
            });

        } catch (error) {
            console.error(`  ❌ Error creating ${userData.email}:`, error.message);
            results.push({
                email: userData.email,
                success: false,
                error: error.message
            });
        }
    }

    // Print summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 CREATION SUMMARY');
    console.log('='.repeat(60) + '\n');

    const successful = results.filter(r => r.success);
    const failed = results.filter(r => !r.success);

    console.log(`✅ Successfully created: ${successful.length}/${testUsers.length} users\n`);

    if (successful.length > 0) {
        console.log('Created Users:');
        successful.forEach(user => {
            console.log(`  ✅ ${user.email}`);
            console.log(`     Role: ${user.role} | Tier: ${user.tier}`);
            console.log(`     Firebase UID: ${user.firebaseUid}`);
            console.log(`     SQLite ID: ${user.sqliteId}\n`);
        });
    }

    if (failed.length > 0) {
        console.log('Failed Users:');
        failed.forEach(user => {
            console.log(`  ❌ ${user.email}: ${user.error}\n`);
        });
    }

    console.log('='.repeat(60));
    console.log('\n🔗 View users in Firebase Console:');
    console.log('https://console.firebase.google.com/project/login-df66c/authentication/users\n');

    console.log('📊 View users in SQLite:');
    console.log('cd "../ST6 Nexus Ops/scaleops6-platform"');
    console.log('sqlite3 scaleops6.db "SELECT id, email, role, tier FROM users;"\n');

    console.log('🔐 Test Login Credentials:');
    console.log('Admin: admin@scaleops6.com / Admin123!');
    console.log('User: john@techstart.com / User123!');
    console.log('VC: jane@venturecap.com / VC123!');
    console.log('ST6 Partner: mike@st6.com / Partner123!\n');

    // Close database
    await db.close();
    
    console.log('✅ Test user creation complete!');
    process.exit(0);
}

// Run the script
createTestUsers().catch(error => {
    console.error('💥 Fatal error:', error);
    process.exit(1);
});
/**
 * Link Existing Firebase Users to SQLite Database
 * 
 * The users were already created in Firebase, now we need to add them to SQLite
 */

const DatabaseService = require('./database-service');

// Firebase UIDs from the previous run
const firebaseUsers = [
    {
        firebaseUid: 'CXCKWLoMZtNM3VHPKc2aMzAAd8v2',
        email: 'admin@scaleops6.com',
        fullName: 'System Administrator',
        company: 'ScaleOps6',
        role: 'admin',
        tier: 3
    },
    {
        firebaseUid: 'q4kBsuiVZfNQBcijFKdUKNTRDJk1',
        email: 'john@techstart.com',
        fullName: 'John Doe',
        company: 'TechStart Inc.',
        role: 'user',
        tier: 1
    },
    {
        firebaseUid: '1rQYaaseJ7OSk2oMy2kxwx9nWzg2',
        email: 'jane@venturecap.com',
        fullName: 'Jane Smith',
        company: 'Venture Capital Partners',
        role: 'vc',
        tier: 2
    },
    {
        firebaseUid: 'vDvQVqMiK9g2R5ehBKB2yfbXIaH3',
        email: 'mike@st6.com',
        fullName: 'Mike Johnson',
        company: 'ScaleTeam6',
        role: 'st6_partner',
        tier: 3
    },
    {
        firebaseUid: 'TAzGcIGoi8cAQKwEcwre4N9Iww32',
        email: 'sarah@startup.io',
        fullName: 'Sarah Williams',
        company: 'Startup.io',
        role: 'user',
        tier: 0
    }
];

async function linkUsers() {
    console.log('🔗 Linking Firebase users to SQLite database...\n');
    
    const db = new DatabaseService();
    const results = [];

    for (const userData of firebaseUsers) {
        try {
            console.log(`📝 Creating database record for: ${userData.email}`);
            
            const result = await db.createUser({
                firebaseUid: userData.firebaseUid,
                email: userData.email,
                fullName: userData.fullName,
                role: userData.role,
                tier: userData.tier,
                subscriptionStatus: userData.tier > 0 ? 'paid' : 'free',
                metadata: { company: userData.company }
            });

            console.log(`  ✅ Created in SQLite (ID: ${result.userId})\n`);

            results.push({
                email: userData.email,
                sqliteId: result.userId,
                success: true
            });

        } catch (error) {
            console.error(`  ❌ Error creating ${userData.email}:`, error.message, '\n');
            results.push({
                email: userData.email,
                success: false,
                error: error.message
            });
        }
    }

    // Print summary
    console.log('='.repeat(60));
    console.log('📊 LINKING SUMMARY');
    console.log('='.repeat(60) + '\n');

    const successful = results.filter(r => r.success);
    const failed = results.filter(r => !r.success);

    console.log(`✅ Successfully linked: ${successful.length}/${firebaseUsers.length} users\n`);

    if (successful.length > 0) {
        console.log('Linked Users:');
        successful.forEach(user => {
            console.log(`  ✅ ${user.email} (SQLite ID: ${user.sqliteId})`);
        });
        console.log('');
    }

    if (failed.length > 0) {
        console.log('Failed Users:');
        failed.forEach(user => {
            console.log(`  ❌ ${user.email}: ${user.error}`);
        });
        console.log('');
    }

    console.log('='.repeat(60));
    console.log('\n🔗 View users in Firebase Console:');
    console.log('https://console.firebase.google.com/project/login-df66c/authentication/users\n');

    console.log('📊 View users in SQLite:');
    console.log('cd "../ST6 Nexus Ops/scaleops6-platform"');
    console.log('sqlite3 scaleops6.db "SELECT id, email, role, tier, firebase_uid FROM users;"\n');

    console.log('🔐 Test Login Credentials:');
    console.log('Admin: admin@scaleops6.com / Admin123!');
    console.log('User: john@techstart.com / User123!');
    console.log('VC: jane@venturecap.com / VC123!');
    console.log('ST6 Partner: mike@st6.com / Partner123!\n');

    // Close database
    await db.close();
    
    console.log('✅ User linking complete!');
    process.exit(0);
}

// Run the script
linkUsers().catch(error => {
    console.error('💥 Fatal error:', error);
    process.exit(1);
});
const DatabaseService = require('./database-service.js');

async function checkScores() {
    const db = new DatabaseService();
    
    console.log('\n📊 Checking Block 1 Subcomponent Scores...\n');
    
    for (let i = 1; i <= 6; i++) {
        const subId = `1-${i}`;
        const history = await db.getScoreHistory(subId, 5);
        
        console.log(`\n${subId}:`);
        if (history.length === 0) {
            console.log('  ❌ No analyses found');
        } else {
            history.forEach((entry, idx) => {
                console.log(`  ${idx + 1}. Score: ${entry.overall_score}% - ${new Date(entry.created_at).toLocaleString()}`);
            });
        }
    }
    
    console.log('\n📈 Checking Block Score Cache...\n');
    const cache = await db.getBlockScoreCache(1);
    if (cache) {
        console.log(`Block 1 Average: ${cache.average_score}%`);
        console.log(`Completed: ${cache.completed_count}/6`);
        console.log(`Last Updated: ${cache.last_updated}`);
    } else {
        console.log('No cache entry found');
    }
    
    await db.close();
}

checkScores().catch(console.error);
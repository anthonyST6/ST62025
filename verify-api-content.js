const http = require('http');

// All 96 subcomponent IDs
const allSubcomponentIds = [];
for (let block = 1; block <= 16; block++) {
  for (let sub = 1; sub <= 6; sub++) {
    allSubcomponentIds.push(`${block}-${sub}`);
  }
}

console.log('🔍 Verifying all 96 subcomponents via API...\n');

let found = 0;
let missing = [];
let checked = 0;

function checkSubcomponent(id) {
  return new Promise((resolve) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: `/api/subcomponents/${id}`,
      method: 'GET'
    };

    const req = http.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.education && json.education.what && json.education.what !== 'Content coming soon...') {
            console.log(`✅ ${id}: ${json.education.title || json.name}`);
            found++;
          } else {
            console.log(`❌ ${id}: Missing content`);
            missing.push(id);
          }
        } catch (e) {
          console.log(`❌ ${id}: Error parsing response`);
          missing.push(id);
        }
        resolve();
      });
    });
    
    req.on('error', (e) => {
      console.log(`❌ ${id}: Request failed - ${e.message}`);
      missing.push(id);
      resolve();
    });
    
    req.end();
  });
}

// Check all subcomponents sequentially
async function verifyAll() {
  for (const id of allSubcomponentIds) {
    await checkSubcomponent(id);
    checked++;
  }
  
  console.log('\n📊 SUMMARY:');
  console.log(`   Total expected: 96`);
  console.log(`   Found with content: ${found}`);
  console.log(`   Missing content: ${missing.length}`);
  
  if (missing.length > 0) {
    console.log('\n❌ MISSING SUBCOMPONENTS:');
    missing.forEach(id => console.log(`   - ${id}`));
  } else {
    console.log('\n✅ All 96 subcomponents have content!');
  }
}

// Wait a moment for server to be ready
setTimeout(() => {
  verifyAll();
}, 1000);
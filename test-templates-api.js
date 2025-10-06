const http = require('http');

// Test the API endpoint
const options = {
  hostname: 'localhost',
  port: 3001,
  path: '/api/subcomponents/1-1',
  method: 'GET'
};

const req = http.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    try {
      const response = JSON.parse(data);
      
      console.log('\n✅ API Response received for subcomponent 1-1');
      console.log('=====================================\n');
      
      // Check if templates exist in the response
      if (response.templates) {
        console.log('📋 Templates found directly:');
        console.log(JSON.stringify(response.templates, null, 2));
      }
      
      // Check if templates exist in resources
      if (response.resources && response.resources.templates) {
        console.log('\n📚 Templates found in resources:');
        console.log(JSON.stringify(response.resources.templates, null, 2));
        console.log(`\n✅ Total templates: ${response.resources.templates.length}`);
        
        // Verify we have exactly 3 templates
        if (response.resources.templates.length === 3) {
          console.log('✅ SUCCESS: Subcomponent has exactly 3 templates as required!');
        } else {
          console.log(`⚠️ WARNING: Expected 3 templates, found ${response.resources.templates.length}`);
        }
      } else {
        console.log('❌ ERROR: No templates found in response!');
        console.log('\nFull response structure:');
        console.log(JSON.stringify(Object.keys(response), null, 2));
      }
      
    } catch (error) {
      console.error('❌ Error parsing response:', error);
      console.log('Raw response:', data);
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Request failed:', error);
});

req.end();
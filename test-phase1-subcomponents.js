// Test script to verify all Phase 1 subcomponents are working
const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:3000';

// Phase 1 blocks and their subcomponents
const PHASE1_BLOCKS = {
  'Block 1 - Mission Discovery': [
    { id: '1-1', name: 'Problem Statement', agent: 'problem-statement' },
    { id: '1-2', name: 'Mission Statement', agent: 'mission-discovery' },
    { id: '1-3', name: 'Customer Insights', agent: 'mission-discovery' },
    { id: '1-4', name: 'Founding Team Capability', agent: 'mission-discovery' },
    { id: '1-5', name: 'Market Insights', agent: 'mission-discovery' },
    { id: '1-6', name: 'Prototype Launch Plan', agent: 'mission-discovery' }
  ],
  'Block 2 - Customer Insights': [
    { id: '2-1', name: 'Personas Framework', agent: 'customer-insights' },
    { id: '2-2', name: 'Pain Point Mapping', agent: 'customer-insights' },
    { id: '2-3', name: 'Customer Journey Map', agent: 'customer-insights' },
    { id: '2-4', name: 'Segment Tiering', agent: 'customer-insights' },
    { id: '2-5', name: 'Signal Grading', agent: 'customer-insights' },
    { id: '2-6', name: 'Prioritization Rubric', agent: 'customer-insights' }
  ],
  'Block 3 - Strategic Prioritization': [
    { id: '3-1', name: 'Feature Prioritization Matrix', agent: 'strategic-prioritization' },
    { id: '3-2', name: 'Resource Allocation Model', agent: 'strategic-prioritization' },
    { id: '3-3', name: 'Risk Assessment Framework', agent: 'strategic-prioritization' },
    { id: '3-4', name: 'Competitive Positioning Map', agent: 'strategic-prioritization' },
    { id: '3-5', name: 'Growth Hypothesis Testing', agent: 'strategic-prioritization' },
    { id: '3-6', name: 'Decision Criteria Framework', agent: 'strategic-prioritization' }
  ],
  'Block 4 - Prototype Launch': [
    { id: '4-1', name: 'Feature Inclusion Matrix', agent: 'prototype-launch' },
    { id: '4-2', name: 'Technical Scope Tracker', agent: 'prototype-launch' },
    { id: '4-3', name: 'Pilot Group Selection', agent: 'prototype-launch' },
    { id: '4-4', name: 'QA & Success Criteria', agent: 'prototype-launch' },
    { id: '4-5', name: 'Timeline Gantt or Roadmap', agent: 'prototype-launch' },
    { id: '4-6', name: 'Post-Mortem Template', agent: 'prototype-launch' }
  ]
};

// Sample worksheet data for testing
const SAMPLE_WORKSHEET_DATA = {
  'question1': 'We are building a GTM acceleration platform for early-stage B2B SaaS startups',
  'question2': 'Startups struggle with go-to-market execution and waste 6-12 months on ineffective strategies',
  'question3': 'We provide structured frameworks, AI-powered analysis, and actionable playbooks',
  'question4': 'Our target customers are seed to Series A B2B SaaS founders and GTM leaders',
  'question5': 'We have validated this with 50+ customer interviews and 10 pilot customers'
};

async function testSubcomponent(subcomponent) {
  console.log(`\n📋 Testing ${subcomponent.id}: ${subcomponent.name}`);
  
  try {
    // Step 1: Check if subcomponent loads
    console.log('  1️⃣ Checking if subcomponent loads...');
    const infoResponse = await fetch(`${BASE_URL}/api/subcomponents/${subcomponent.id}`);
    
    if (!infoResponse.ok) {
      throw new Error(`Failed to load subcomponent: ${infoResponse.status}`);
    }
    
    const info = await infoResponse.json();
    console.log(`     ✅ Loaded: ${info.name || subcomponent.name}`);
    console.log(`     📚 Has education: ${!!info.education}`);
    console.log(`     🎯 Has workspace: ${!!info.workspace}`);
    
    // Step 2: Test analysis endpoint
    console.log('  2️⃣ Testing analysis endpoint...');
    
    // Determine the correct endpoint based on subcomponent
    let endpoint = '';
    let requestBody = {
      worksheetData: SAMPLE_WORKSHEET_DATA,
      subcomponentId: subcomponent.id
    };
    
    // Route to the correct endpoint based on block
    const blockNum = parseInt(subcomponent.id.split('-')[0]);
    
    // Special handling for Problem Statement (1-1)
    if (subcomponent.id === '1-1') {
      endpoint = '/api/analyze/problem-statement';
      requestBody.worksheetData = {
        'who-affected': 'B2B SaaS founders and GTM leaders at early-stage startups',
        'what-problem': 'Struggle to build effective go-to-market strategies',
        'when-occur': 'During critical growth phases when scaling',
        'what-impact': 'Lose 6-12 months of runway and $500K-$2M in wasted resources',
        'how-solving': 'Using expensive consultants and generic online courses',
        'evidence-validation': 'Interviewed 50+ founders, 85% lack structured GTM processes'
      };
    } else if (blockNum === 1) {
      // Block 1: Mission Discovery
      endpoint = '/api/analyze/mission-discovery';
    } else if (blockNum === 2) {
      // Block 2: Customer Insights
      endpoint = '/api/analyze/customer-insights';
    } else if (blockNum === 3) {
      // Block 3: Strategic Prioritization
      endpoint = '/api/analyze/strategic-prioritization';
    } else if (blockNum === 4) {
      // Block 4: Prototype Launch
      endpoint = '/api/analyze/prototype-launch';
    } else {
      throw new Error(`Unknown block number: ${blockNum}`);
    }
    
    const analysisResponse = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': '1'
      },
      body: JSON.stringify(requestBody)
    });
    
    if (!analysisResponse.ok) {
      const errorText = await analysisResponse.text();
      throw new Error(`Analysis failed: ${analysisResponse.status} - ${errorText}`);
    }
    
    const analysis = await analysisResponse.json();
    console.log(`     ✅ Analysis successful!`);
    console.log(`     📊 Score: ${analysis.score}%`);
    console.log(`     💡 Recommendations: ${analysis.recommendations?.length || 0}`);
    console.log(`     🎯 Confidence: ${analysis.confidence ? (analysis.confidence * 100).toFixed(0) + '%' : 'N/A'}`);
    
    // Check for detailed scores
    if (analysis.detailedScores) {
      const dimensions = Object.keys(analysis.detailedScores);
      console.log(`     📈 Dimensions analyzed: ${dimensions.length}`);
      dimensions.forEach(dim => {
        const score = analysis.detailedScores[dim];
        console.log(`        - ${dim}: ${score.score || 0}/${score.maxScore || 20}`);
      });
    }
    
    return {
      id: subcomponent.id,
      name: subcomponent.name,
      success: true,
      score: analysis.score,
      hasEducation: !!info.education,
      hasWorkspace: !!info.workspace,
      hasAnalysis: true,
      recommendationsCount: analysis.recommendations?.length || 0
    };
    
  } catch (error) {
    console.error(`     ❌ Error: ${error.message}`);
    return {
      id: subcomponent.id,
      name: subcomponent.name,
      success: false,
      error: error.message
    };
  }
}

async function testAllPhase1() {
  console.log('🚀 Starting Phase 1 Subcomponents Test');
  console.log('=' .repeat(60));
  
  const results = {
    total: 0,
    successful: 0,
    failed: 0,
    blocks: {}
  };
  
  for (const [blockName, subcomponents] of Object.entries(PHASE1_BLOCKS)) {
    console.log(`\n\n🏗️  ${blockName}`);
    console.log('-'.repeat(50));
    
    results.blocks[blockName] = {
      total: subcomponents.length,
      successful: 0,
      failed: 0,
      subcomponents: []
    };
    
    for (const subcomponent of subcomponents) {
      const result = await testSubcomponent(subcomponent);
      results.blocks[blockName].subcomponents.push(result);
      results.total++;
      
      if (result.success) {
        results.successful++;
        results.blocks[blockName].successful++;
      } else {
        results.failed++;
        results.blocks[blockName].failed++;
      }
      
      // Small delay to avoid overwhelming the server
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }
  
  // Print summary
  console.log('\n\n' + '='.repeat(60));
  console.log('📊 TEST SUMMARY');
  console.log('='.repeat(60));
  
  console.log(`\n📈 Overall Results:`);
  console.log(`   Total Subcomponents: ${results.total}`);
  console.log(`   ✅ Successful: ${results.successful} (${((results.successful/results.total)*100).toFixed(1)}%)`);
  console.log(`   ❌ Failed: ${results.failed} (${((results.failed/results.total)*100).toFixed(1)}%)`);
  
  console.log(`\n📊 Block-by-Block Results:`);
  for (const [blockName, blockResults] of Object.entries(results.blocks)) {
    console.log(`\n   ${blockName}:`);
    console.log(`      ✅ Working: ${blockResults.successful}/${blockResults.total}`);
    
    if (blockResults.failed > 0) {
      console.log(`      ❌ Failed subcomponents:`);
      blockResults.subcomponents
        .filter(s => !s.success)
        .forEach(s => {
          console.log(`         - ${s.id} ${s.name}: ${s.error}`);
        });
    }
    
    // Show average score for successful ones
    const successfulSubs = blockResults.subcomponents.filter(s => s.success);
    if (successfulSubs.length > 0) {
      const avgScore = successfulSubs.reduce((sum, s) => sum + s.score, 0) / successfulSubs.length;
      console.log(`      📊 Average Score: ${avgScore.toFixed(1)}%`);
    }
  }
  
  // List any critical issues
  const criticalIssues = [];
  for (const [blockName, blockResults] of Object.entries(results.blocks)) {
    blockResults.subcomponents.forEach(sub => {
      if (!sub.success) {
        criticalIssues.push(`${sub.id} (${blockName}): ${sub.error}`);
      } else if (!sub.hasEducation) {
        criticalIssues.push(`${sub.id} (${blockName}): Missing education content`);
      } else if (!sub.hasWorkspace) {
        criticalIssues.push(`${sub.id} (${blockName}): Missing workspace content`);
      }
    });
  }
  
  if (criticalIssues.length > 0) {
    console.log(`\n⚠️  Critical Issues Found:`);
    criticalIssues.forEach(issue => {
      console.log(`   - ${issue}`);
    });
  } else {
    console.log(`\n✅ All Phase 1 subcomponents are working properly!`);
  }
  
  return results;
}

// Run the test
testAllPhase1()
  .then(results => {
    console.log('\n\n✅ Test completed!');
    process.exit(results.failed > 0 ? 1 : 0);
  })
  .catch(error => {
    console.error('\n\n❌ Test failed with error:', error);
    process.exit(1);
  });
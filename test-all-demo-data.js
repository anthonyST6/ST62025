/**
 * Test that all 96 subcomponents have specific demo data
 * and no generic answers are being used
 */

const { st6coDemoData, getDemoAnswer, generateGenericAnswer } = require('./st6co-demo-data-complete.js');

console.log('Testing all 96 subcomponents for specific demo data...\n');

let totalSubcomponents = 0;
let subcomponentsWithData = 0;
let genericAnswersUsed = 0;
const missingSubcomponents = [];

// Test all 16 blocks with 6 subcomponents each
for (let block = 1; block <= 16; block++) {
  for (let sub = 1; sub <= 6; sub++) {
    totalSubcomponents++;
    const subcomponentKey = `${block}-${sub}`;
    
    // Check if we have specific data for this subcomponent
    if (st6coDemoData[subcomponentKey]) {
      subcomponentsWithData++;
      
      // Check that all 6 questions have answers
      let hasAllQuestions = true;
      for (let q = 1; q <= 6; q++) {
        const questionKey = `${block}-${sub}-q${q}`;
        if (!st6coDemoData[subcomponentKey][questionKey]) {
          hasAllQuestions = false;
          console.log(`⚠️  Missing question ${q} for subcomponent ${subcomponentKey}`);
        }
      }
      
      if (hasAllQuestions) {
        console.log(`✅ ${subcomponentKey}: All 6 questions have specific answers`);
      }
    } else {
      missingSubcomponents.push(subcomponentKey);
      console.log(`❌ ${subcomponentKey}: No specific data - using generic answers`);
      
      // Test if getDemoAnswer falls back to generic
      const testAnswer = getDemoAnswer(block, sub, 'q1');
      const genericAnswer = generateGenericAnswer(block, sub, 'q1');
      if (testAnswer === genericAnswer) {
        genericAnswersUsed++;
      }
    }
  }
}

console.log('\n' + '='.repeat(60));
console.log('SUMMARY:');
console.log('='.repeat(60));
console.log(`Total subcomponents: ${totalSubcomponents}`);
console.log(`Subcomponents with specific data: ${subcomponentsWithData}`);
console.log(`Subcomponents using generic answers: ${missingSubcomponents.length}`);
console.log(`Coverage: ${((subcomponentsWithData / totalSubcomponents) * 100).toFixed(1)}%`);

if (missingSubcomponents.length > 0) {
  console.log('\nMissing subcomponents:');
  console.log(missingSubcomponents.join(', '));
}

// Test a few specific answers to ensure quality
console.log('\n' + '='.repeat(60));
console.log('QUALITY CHECK - Sample Answers:');
console.log('='.repeat(60));

const sampleSubcomponents = ['1-1', '5-3', '10-1', '15-1'];
sampleSubcomponents.forEach(key => {
  const answer = getDemoAnswer(...key.split('-'), 'q1');
  console.log(`\n${key}-q1 (first 200 chars):`);
  console.log(answer.substring(0, 200) + '...');
  
  // Check for generic phrases that shouldn't be there
  const genericPhrases = [
    'We\'re developing systematic approaches',
    'documented processes and regular reviews',
    'establishing baseline processes'
  ];
  
  const hasGenericPhrase = genericPhrases.some(phrase => answer.includes(phrase));
  if (hasGenericPhrase) {
    console.log('⚠️  WARNING: Contains generic phrase!');
  } else {
    console.log('✅ No generic phrases detected');
  }
});

console.log('\n' + '='.repeat(60));
console.log('TEST COMPLETE');
console.log('='.repeat(60));

if (subcomponentsWithData === 96) {
  console.log('✅ SUCCESS: All 96 subcomponents have specific, customized demo data!');
} else {
  console.log(`⚠️  INCOMPLETE: Only ${subcomponentsWithData} of 96 subcomponents have specific data`);
}
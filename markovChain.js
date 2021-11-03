const Markov = require('js-markov'); //NOTE: we might want to switch to RiTa for more consitent results / less post processing
let markov = new Markov();
const parse = require('csv-parse/lib/sync');
const fs = require('fs');

// import dataset
const csv = fs.readFileSync('./data/all.csv');

let poems = parse(csv, {
  columns: true,
  skip_empty_lines: true,
})

// pre-process dataset
poems = poems.filter((poem) => {
  return poem.age == 'Modern' && poem.type.includes('Nature');
})

let sentences = [];

for(let poem of poems) {
  sentences = sentences.concat(poem.content.split(/[.,?:;]/));
}

sentences = sentences.map((sentence) => {
  sentence = sentence.replace(/\r\n|\t|\s\s/g, ' ');
  sentence = sentence.replace(/\s\s/g, ' ');
  return sentence.trim();
})

sentences = sentences.filter((sentence) => {
  return sentence != '' && sentence != '\n' && sentence != ' ';
})

// clearing the chain before use
markov.clearChain();

// add data to construct probability matrix
markov.addStates(sentences);

// generate probability matrix with specified n-gram
markov.train(5);

// generate poem of approximately the same length
let poem = '';
for (let i = 0; i < 5; i++) {
  let text = markov.generateRandom(150); // generate a sentence and cut it off if a possible end has not been reached after 150 characters

  //sentence based post processing
  // TODO: check if last word is actual word / existing word from dataset
  // TODO: remove pharenteces if there is no matching pair
  text = text.replace(/\r\n|\n|\r|\t/g, ' '); 
  // TODO: remove double spaces
  // TODO: uppercase initial character + uppercase I's

  poem += text + '\n';
}

// post post proccessing 
poem = poem.toLocaleLowerCase();

// log poem
console.log(poem);
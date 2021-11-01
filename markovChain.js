const Markov = require('js-markov');
var markov = new Markov();
const json = require('./data-whole-poems.json')
// const csv = require('./kaggle_poem_dataset.csv')
const parse = require('csv-parse/lib/sync')
const fs = require('fs')


const csv = fs.readFileSync('./kaggle_poem_dataset.csv')

const poems = parse(csv, {
  columns: true,
  skip_empty_lines: true
})

let sentences = []

for(let poem of poems) {
  // sentences = sentences.concat(poem.Content.split('\n'));
  sentences = sentences.concat(poem.Content.split(/[.,]/));
}

sentences = sentences.map((sentence) => {
  return sentence.replace('\n', ' ')
})

sentences = sentences.filter((sentence) => {
  return sentence != ''
})

// clearing the chain before each run
markov.clearChain();

// filtering for poems on a certain theme
// const data = json.data.filter((poem) => {
//   return poem.categories.includes("contentment");
// })


// // adding the sentences to the chain
// for(let poem of data) {
//   for(let sentence of poem.sentences) {
//     markov.addStates(sentence);
//   }
// }

for (let poem of poems) {
  markov.addStates(sentences);
}

markov.train(5);

let poem = "\n";
for (let i = 0; i < 5; i++) {
  var text = markov.generateRandom(150);
  poem += text + '\n';
}

// make sure the cases make sense
// TODO: uppercase initial character + uppercase I's
poem = poem.toLocaleLowerCase();

var prob = markov.getPossibilities('');

console.log(poem);
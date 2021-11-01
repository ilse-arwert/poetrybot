const Markov = require('js-markov');
var markov = new Markov();
const parse = require('csv-parse/lib/sync');
const fs = require('fs');


const csv = fs.readFileSync('./data/all.csv');

let poems = parse(csv, {
  columns: true,
  skip_empty_lines: true,
})

poems = poems.filter((poem) => {
  return poem.age == 'Modern' && poem.type.includes("Nature");
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


// clearing the chain before each run
markov.clearChain();

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
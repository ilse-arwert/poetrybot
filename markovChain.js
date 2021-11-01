const Markov = require('js-markov');
var markov = new Markov();
const json = require('./data.json')

// clearing the chain before each run
markov.clearChain();

// filtering for poems on a certain theme
const data = json.data.filter((poem) => {
  return poem.categories.includes("slice-of-life");
})

// adding the sentences to the chain
for(let poem of data) {
  for(let sentence of poem.sentences) {
    markov.addStates(sentence);
  }
}

markov.train(6);

let poem = "\n";
for (let i = 0; i < 5; i++) {
  var text = markov.generateRandom(150);
  poem += text + '\n';
}

// just in case: make sure the cases make sense
poem = poem.toLocaleLowerCase();

console.log(poem);
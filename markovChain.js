const Markov = require('js-markov');
var markov = new Markov();
const json = require('./data.json')

// If you are generating words, adding multiple states
for(let poem of json.data) {
  markov.addStates(poem.sentences);
}

  // If you are generating text, adding a single state
markov.addStates('The weather for tomorrow might be sunny');

markov.train();

// var longText = markov.generate(50);
var text = markov.generateRandom(50);
// var possibilities = markov.getPossibilities('Hey');

console.log(text);
// console.log(longText);
// console.log(possibilities);
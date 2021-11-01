const Markov = require('js-markov');
var markov = new Markov();
const json = require('./data.json')

// If you are generating words, adding multiple states
markov.addStates(json.data);

markov.train();

// var longText = markov.generate(50);
var text = markov.generateRandom(150);
// var possibilities = markov.getPossibilities('Hey');

console.log(text);
// console.log(longText);
// console.log(possibilities);
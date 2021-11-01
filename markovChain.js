const Markov = require('js-markov');
var markov = new Markov();

// If you are generating words, adding multiple states
markov.addStates([
    'Today is sunny',
    'Today is rainy',
    'The weather is sunny',
    'The weather for tomorrow might be rainy'
  ]);

  // If you are generating text, adding a single state
markov.addStates('The weather for tomorrow might be sunny');

markov.train();

// var longText = markov.generate(50);
var text = markov.generateRandom(50);
// var possibilities = markov.getPossibilities('Hey');

console.log(text);
// console.log(longText);
// console.log(possibilities);
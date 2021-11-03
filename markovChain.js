const parse = require('csv-parse/lib/sync');
const fs = require('fs');
const RiTa = require('rita');

// random seed for reproducable results (?)
// RiTa.randomSeed(1);

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
  sentences = sentences.concat(poem.content.split(/[.,?:;]/g));
}

sentences = sentences.map((sentence) => {
  sentence = sentence.replace(/\r\n|\t|\s\s/g, ' ');
  sentence = sentence.replace(/\s\s/g, ' ');
  return sentence.trim();
})

sentences = sentences.filter((sentence) => {
  return sentence != '' && sentence != '\n' && sentence != ' ';
})

// create markov chain with specified n-gram
const markov = RiTa.markov(3); 

// add data to construct probability matrix
markov.addText(sentences);

// generate a poem of five lines
let poem = []; 
for(let i = 0; i < 5; i++) {
  let text = markov.generate(1)[0]; //NOTE: RiTa cannot always generate 5 scentences in one go
  let firstLetter = text.slice(0, 1).toLocaleUpperCase();
  let rest = text.slice(1, text.length).toLocaleLowerCase();
  rest.replace(/i/g, 'I');
  text = `${firstLetter}${rest}`;
  poem.push(text); 
}

// post processing
let firstScentence = poem[0].split(' ');
let lastWord = firstScentence[firstScentence.length - 1];
lastWord.replace(/[.,?:;!]/, '');
let rhymes = RiTa.rhymes(lastWord);

if(rhymes.length > 0) {
  const randomRhymeIndex = Math.floor(Math.random() * rhymes.length);
  const randomRhyme = rhymes[randomRhymeIndex];
  poem[poem.length - 1] += ` ${randomRhyme}`;
} 

console.log(poem); 
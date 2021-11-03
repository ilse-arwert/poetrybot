let poemContainer;
let nextBtn;

document.addEventListener('DOMContentLoaded', init);

function init() {
    poemContainer = document.querySelector('#poem');
    nextBtn = document.querySelector('#next');
    const poem = formatPoem(getPoem());
    displayPoem(poem);
}

function getPoem() {
    //TODO: replace with dynamic call to poem server(?)
    return `upon the birds swim through i am myself
    that fine light-house of care massing do
    being bushes
    wild processions of light men above brin
    but look far depart`;
}

//NOTE: we could do this in the back-end instead and make this function redundand
function formatPoem(poem) {
    poem = poem.split('\n');
    poem = poem.map((sentence) => {
        return sentence = sentence.trim();
    })

    return poem;
}

function addSentence(sentence) {
    let span = document.createElement('SPAN');
    span.innerText = sentence;
    poemContainer.appendChild(span);
}

function toggleBtnVisibility() {
    nextBtn.classList.toggle('hidden');
}

async function displayPoem(poem) {
    for(let sentence of poem) {
        addSentence(sentence);
        await delay(1500);
    }

    toggleBtnVisibility();
}

function delay(ms) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}
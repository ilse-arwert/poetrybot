let poemContainer;
let nextBtn;

document.addEventListener('DOMContentLoaded', init);

function init() {
    poemContainer = document.querySelector('#poem');
    nextBtn = document.querySelector('#next');
    nextBtn.addEventListener('click', nextBtnClickHandler);
    const poem = formatPoem(getPoem());
    displayPoem(poem);
}

function getPoem() {
    //LATER: replace with dynamic call to poem server(?)

    //TODO: randomly select from a couple of poems
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

async function removeSentence(sentenceEl) {
    sentenceEl.classList.add('hide');
    await delay(800);
    const prevSibling = sentenceEl.previousSibling;
    poemContainer.removeChild(sentenceEl);

    return prevSibling;
}

function toggleBtnVisibility() {
    nextBtn.disabled = !nextBtn.disabled;
}

async function displayPoem(poem) {
    for(let sentence of poem) {
        addSentence(sentence);
        await delay(1500);
    }

    await delay(1500);
    toggleBtnVisibility();
}

async function removePoem() {
    for(let i = poemContainer.children.length - 1; i >= 0; i--) {
        const sentence = poemContainer.children[poemContainer.children.length - 1];
        await removeSentence(sentence);
    }
}

function delay(ms) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}

async function nextBtnClickHandler(e) {
    toggleBtnVisibility();
    await removePoem();
    const poem = formatPoem(getPoem());
    displayPoem(poem);
}
let poemContainer;
let nextBtn;

document.addEventListener('DOMContentLoaded', init);

async function init() {
    poemContainer = document.querySelector('#poem');
    nextBtn = document.querySelector('#next');
    nextBtn.addEventListener('click', nextBtnClickHandler);
    const poem = await getPoem();
    displayPoem(poem);
}

async function getPoem() {
    const res = await fetch('/poem');
    const data = await res.json();
    return data.poem;
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
    const poem = await getPoem();
    displayPoem(poem);
}
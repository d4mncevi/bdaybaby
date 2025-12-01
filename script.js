const puzzleArea = document.getElementById('puzzleArea');
const surpriseBtnContainer = document.getElementById('surpriseBtnContainer');
const surpriseBtn = document.getElementById('surpriseBtn');
const surpriseContainer = document.getElementById('surpriseContainer');
const messageEl = document.getElementById('surpriseMessage');

const rows = 3;
const cols = 3;
let pieces = [];

// Initialize puzzle
function initPuzzle() {
    pieces = [];
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const piece = document.createElement('div');
            piece.classList.add('piece');
            piece.style.backgroundImage = 'url(cake.jpg)';
            piece.style.backgroundPosition = `-${c * 133.33}px -${r * 133.33}px`;
            piece.dataset.correct = r * cols + c;
            piece.draggable = true;

            puzzleArea.appendChild(piece);
            pieces.push(piece);

            piece.addEventListener('dragstart', dragStart);
            piece.addEventListener('dragover', dragOver);
            piece.addEventListener('drop', drop);
        }
    }
    shufflePieces();
}

// Shuffle pieces
function shufflePieces() {
    pieces.sort(() => Math.random() - 0.5);
    pieces.forEach(piece => puzzleArea.appendChild(piece));
}

// Drag & Drop
let dragged;
function dragStart(e) { dragged = e.target; }
function dragOver(e) { e.preventDefault(); }
function drop(e) {
    e.preventDefault();
    const target = e.target;
    if (target && target !== dragged) {
        const nodes = Array.from(puzzleArea.children);
        const draggedIndex = nodes.indexOf(dragged);
        const targetIndex = nodes.indexOf(target);

        if (draggedIndex > targetIndex) {
            puzzleArea.insertBefore(dragged, target);
        } else {
            puzzleArea.insertBefore(dragged, target.nextSibling);
        }
    }
    checkPuzzle();
}

// Check puzzle solved
function checkPuzzle() {
    const current = Array.from(puzzleArea.children).map(p => p.dataset.correct);
    const correct = [...Array(rows * cols).keys()].map(String);

    if (JSON.stringify(current) === JSON.stringify(correct)) {
        surpriseBtnContainer.classList.remove('hidden');
        Array.from(puzzleArea.children).forEach(p => p.draggable = false);
    }
}

// Start puzzle
window.addEventListener('load', initPuzzle);

// Surprise button click: hide puzzle, show video and live typing message
surpriseBtn.addEventListener('click', () => {
    // Hide puzzle and button
    puzzleArea.style.display = 'none';
    surpriseBtnContainer.style.display = 'none';

    // Show video and message container
    surpriseContainer.style.display = 'block';

    const messageText = "Happy, Happy Birthday, Baby! 🥰 \nSaglit pa lang tayo magkasma, but it already feels like years. I’ve seen you grow from being childish to the amazing man you are now. There are things you don’t know yet, and things I don’t know yet, but we’ll keep learning and growing together, baby. I am so proud of you. You’re so good at things I’m not haha, and hinahangaan kita ngayon. You’ve changed in such a beautiful way—you’ve grown.\nBoth of us are facing tough times right now, struggling with different challenges. I know you’re always there for me, but please know that I am also always here for you.\nThank you for all the effort you put into us, for staying with me even when I can be hard to deal with, and for always showing your love through both words and actions. I know there are times I might make you feel unloved or like you don’t matter, but that’s never true—you mean the world to me. Sometimes I just have a hard time expressing my feelings, but my love for you is endless.\nThank you for coming back into my life, for never giving up on us, even when I pushed you away. Mahal na mahal kita, Enzo. Thank you for giving me the love I truly deserve, for existing, and for standing strong as a man in our relationship—even if sometimes it isn’t perfect.\nI hope this year brings all your dreams and goals to life, and I hope we reach all our goals together, forever. I’m all in, always. ❤️\nWe don’t know where God will take us, but I hope, at the end of the day, you’re the man I’ll end up with. I love you so much, baby.";
    messageEl.textContent = '';
    let index = 0;

    function typeNext() {
        if (index < messageText.length) {
            messageEl.textContent += messageText[index];
            index++;
            messageEl.scrollTop = messageEl.scrollHeight; // auto scroll
            setTimeout(typeNext, 50); // typing speed
        }
    }

    typeNext();
});

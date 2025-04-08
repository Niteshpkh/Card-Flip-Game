const Emojis = ['🎮', '🎲', '🎯', '🎰', '🎳', '🎸', '🎷', '🎺'];


let flippedCards = [];
let moves = 0;
let timer;
let seconds = 0;
let gameStarted = false;


function createBoard() {
const board = document.getElementById('board');
const card = [...Emojis , ...Emojis]
.sort(()=> Math.random() - 0.5)
.map((emogi, index) => 
    `<div class="card" data-emoji="${emogi}" onclick = "handleClick(this)">
<div class="card-front"></div>
<div class="card-back">${emogi}</div>
</div>`
)
.join('');

board.innerHTML = card;
}

function handleClick(card){
    if(!gameStarted){
        startTimer();
        gameStarted = true;
    }
if((flippedCards.length<2 && !card.classList.contains('flipped')))
{
    card.classList.add('flipped');
    flippedCards.push(card);

    if(flippedCards.length === 2)
    {
        moves ++ ;
        document.getElementById('moves').textContent = moves;
        checkMatch();
    }
}

}

// Match checking function

function checkMatch(){
    const [card1, card2 ]= flippedCards;
    const match = card1.dataset.emoji === card2.dataset.emoji;
    
    if(!match)
    {
        setTimeout(() =>
        {
card1.classList.remove('flipped');
card2.classList.remove('flipped');

        },1000);
    }
    else {
        card1.classList.add('matched');
        card2.classList.add('matched');
    }
    flippedCards = [];
}

function startTimer(){
    timer = setInterval(()=>
    {
        seconds ++;
        document.getElementById('timer').textContent =seconds;
    },1000);
}

function startGame(){
    clearInterval(timer);
    seconds = 0;
    moves = 0;
    gameStarted = false;
    flippedCards = [];
    document.getElementById('timer').textContent = 0;
    document.getElementById('moves').textContent = 0;
    createBoard();
    
}
startGame();


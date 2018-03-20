//start game after the page is loaded and reset if the restart button was clicked
document.addEventListener("DOMContentLoaded", startGame);
//card deck variables
const deck = document.querySelector(".deck");
let cardItem = document.getElementsByClassName("card");
let cards = [...cardItem];
//reveal functionality variables;
let temp = [];
let matchedCards = document.getElementsByClassName("match");
//counter and timer variables;
const restartBtn = document.querySelector(".restart");
const movesCounter = document.querySelector(".moves");
let count = 0, moves = 0, sec = 0, min = 0, interval;
const timerDisplay = document.querySelector(".timer");
//calls start game function on load
startGame();
//add event listeners to card elements
for(let i = 0; i < cards.length; i++) {
	cards[i].addEventListener("click", revealCard);
	cards[i].addEventListener("click", compareCard);
}
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


// start game function
function startGame() {
	resetTimer();
	resetCounter();
	cards = shuffle(cards);
	for(let i = 0; i < cards.length; i++){
		cards[i].classList.remove("open", "show", "match", "disabled");
		deck.appendChild(cards[i]);
	}
} 

restartBtn.addEventListener("click", startGame);

//comparison logic functions
function revealCard(){
	this.classList.add("open", "show", "disabled");
	counter();
}

function compareCard(){
	temp.push(this);
	len = temp.length;
	if(len === 2){
		if(temp[0].innerHTML === temp[1].innerHTML){
			match();
		} else {
			unmatch();
		}
	}
}

function match(){
	temp[0].classList.add("match", "disabled");
	temp[1].classList.add("match", "disabled");
	temp[0].classList.remove("show", "open");
	temp[1].classList.remove("show", "open");
	temp = [];
}

function unmatch(){
	temp[0].classList.add("unmatch");
	temp[1].classList.add("unmatch");
	disable();
	setTimeout(function(){
		temp[0].classList.remove("open", "show", "unmatch");
		temp[1].classList.remove("open", "show", "unmatch");
		enable();
		temp = [];
	}, 1100);
}

function disable(){
	//disable all cards during the time out
	for(let i = 0; i < cards.length; i++){
		cards[i].classList.add("disabled");
	}
}

function enable(){
	//enable all cards, except of matched if any
	for(let i = 0; i < cards.length; i++){
			cards[i].classList.remove("disabled");
	        for(let y = 0; y < matchedCards.length; y++){
           		 matchedCards[y].classList.add("disabled");
        }
	}
}

//counter function, counts moves when 2 cards were clicked
function counter(){
	count++;
	if(count % 2 === 0){
		moves++;
		movesCounter.innerHTML = moves;
	} 

	if(count == 1){
		timer();
	}
}

function resetCounter(){
	count = 0;
	moves = 0;
	movesCounter.innerHTML = moves;
}
//time measurement function
function timer(){
    interval = setInterval(function(){
        timerDisplay.innerHTML = `${min}m :${sec}s`;
        sec++;
        if(sec == 60){
            min++;
            sec=0;
        }
    },1000);
}

function resetTimer(){
	clearInterval(interval);
	sec = 0;
	min = 0;
	timerDisplay.innerHTML = `${min}m :${sec}s`;
}
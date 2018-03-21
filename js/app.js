//start game after the page is loaded and reset if the restart button was clicked
document.addEventListener("DOMContentLoaded", startGame);
//selectors
const deck = document.querySelector(".deck");
const cardItem = document.getElementsByClassName("card");
const matchedCards = document.getElementsByClassName("match");
const restartBtn = document.querySelector(".restart");
const movesCounter = document.querySelector(".moves");
const timerDisplay = document.querySelector(".timer");
const starItem = document.getElementsByClassName("fa-star");
const starsContainer = document.querySelector(".stars");
const modalWindow = document.querySelector(".modal");
const finalTime = document.querySelector(".finalTime");
const finalRating = document.querySelector(".finalRating");
const finalBtn = document.querySelector(".btn");
let cards = [...cardItem];
let stars = [...starItem];
let temp = [];
//counter and timer variables;
let count = 0, moves = 0, sec = 0, min = 0, interval;
//add event listeners to card elements
for(let i = 0; i < cards.length; i++) {
	cards[i].addEventListener("click", revealCard);
	cards[i].addEventListener("click", compareCard);
	cards[i].addEventListener("click", gameWin);
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
	resetRating();
	temp = [];
	modalWindow.classList.remove("open");
	cards = shuffle(cards);
	for(let i = 0; i < cards.length; i++){
		cards[i].classList.remove("open", "show", "match", "unmatch", "disabled");
		deck.appendChild(cards[i]);
	}
} 

restartBtn.addEventListener("click", startGame);
finalBtn.addEventListener("click", startGame);
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
//if cards match run following
function match(){
	temp[0].classList.add("match", "disabled");
	temp[1].classList.add("match", "disabled");
	temp[0].classList.remove("show", "open");
	temp[1].classList.remove("show", "open");
	temp = [];
}
//if cards don't match run following
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
//disabling function, prevents clicking on cards while comparison is in process
function disable(){
	//disable all cards during the time out
	for(let i = 0; i < cards.length; i++){
		cards[i].classList.add("disabled");
	}
}
//enable function
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
			//rate function
			if(moves === 14){
			console.log()
			stars[0].style.color = "#333";
		} else if(moves === 16){
			stars[1].style.color = "#333";
		} else if(moves === 20){
			stars[2].style.color = "#333";
		}
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
        timerDisplay.innerHTML = `Time: ${min}m :${sec}s`;
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
	timerDisplay.innerHTML = `Time: ${min}m :${sec}s`;
}

function resetRating(){
	for(let i = 0; i < stars.length; i++){
		stars[i].style.color = "#f4428f";
	}
}

function gameWin(){
	if(matchedCards.length == 16){
		modalWindow.classList.add("open");
		clearInterval(interval);
		finalRating.innerHTML = starsContainer.innerHTML;
		finalTime.innerHTML = timerDisplay.innerHTML;
	}
}


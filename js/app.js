/*
 * Create a list that holds all of your cards
 */
const deck = document.querySelector(".deck");
let cardItem = document.getElementsByClassName("card");
let cards = [...cardItem];
let temp = [];

document.addEventListener("DOMContentLoaded", startGame);

for(let i = 0; i < cards.length; i++) {
	cards[i].addEventListener("click", revealCard);
	cards[i].addEventListener("click", compareCard);
}
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

// function startGame(){
// 	cards = shuffle(cards);
// 	console.log(cards);
//    for (let i = 0; i < cards.length; i++){
//    	  cards[i].classList.remove("open", "show", "match");
//       [].forEach.call(cards, function(item){
//          deck.appendChild(item);
//       });
//    }
	
// }

function startGame() {
	cards = shuffle(cards);
	for(let i = 0; i < cards.length; i++){
		deck.appendChild(cards[i]);
	}
} 


function revealCard(){
	this.classList.add("open", "show");
}

function compareCard(){
	temp.push(this);
	console.log(temp);
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
	temp[0].classList.add("match");
	temp[1].classList.add("match");
	temp[0].classList.remove("show", "open");
	temp[1].classList.remove("show", "open");
	temp = [];
}

function unmatch(){
	temp[0].classList.add("unmatch");
	temp[1].classList.add("unmatch");
	setTimeout(function(){
		temp[0].classList.remove("open", "show", "unmatch");
		temp[1].classList.remove("open", "show", "unmatch");
		temp = [];
	}, 1100);
}

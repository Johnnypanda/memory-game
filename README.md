# Memory Game Project
	[Memory game screen]: https://github.com/Johnnypanda/memory-game/blob/master/img/memory-game-screenshot.jpg "Memory game"


## How To Play
To play a game click on this [link](https://johnnypanda.github.io/memory-game/).

## Instructions
Memory game is a simple game to test user's memory.
1. To start a game flip a card by clicking on it.
2. Flip another card to find a match.
3. Find all matches to win the game.
4. To get a higher score you should make less moves overall.

## The process of building
* I was provided with the starter grid of cards, my task was to add all the necessary functionality and customizations.
* I used vanilla JS with ES6 features to manipulate the DOM and achieve required functionality.
* Then I customized theme with colors, fonts, icons and other small changes via CSS.
* I also added media queries for better view on mobile devices.

## How it works behind the scenes
1. On click the card is added to a temporary array.
2. When the second card is clicked comparison function is invoked.
3. If cards match, they gain class "match" and stay flipped. Temporary array cleares itself.
4. If cards don't match, they gain class "unmatch" and flip back with a delay, so the user could memorize them. During this delay all the cards are disabled so the user could not flip more than two cards at once. emporary array also cleares itself.
5. When all matches are displayed, the modal window with the final score and time pops out.

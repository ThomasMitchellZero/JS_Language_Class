/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


var scores, roundScore, activePlayer, dice;

scores = [0,0];
roundScore = 0;
activePlayer = 1;
dice = Math.floor(Math.random() * 6) +1;

console.log(dice);

/*The document object refers to the DOM that is generated from the HTML.
The .querySelector method allows us to specify an HTML element (in this case,
we're getting the id of #score-0) and we're adding the result of activePlayer
because all player-specific elements have the same names, except for the number.


the .textContent method allows me to
change what is inside the tags.  
*/

document.querySelector('#current-' + activePlayer).textContent = dice;

var x = document.querySelector('#score-0').textContent;
console.log(x);

/* Goal of this is to make the dice invisible.  Use document.querySelector(
.dice) because the die only has a class, no id.  Then .style says we are going
to change the CSS, the next element (.display) tells us which property we are
going to change, and then what follows the = sign is what we are setting that
property to - in this case, 'none' because we want it hidden.  remember that
the property has to be a string.

*/

document.querySelector('.dice').style.display = "none";
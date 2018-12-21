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
activePlayer = 0;


/* Goal of this is to make the dice invisible.  Use document.querySelector(
.dice) because the die only has a class, no id.  Then .style says we are going
to change the CSS, the next element (.display) tells us which property we are
going to change, and then what follows the = sign is what we are setting that
property to - in this case, 'none' because we want it hidden.  remember that
the property has to be a string.

*/

document.querySelector('.dice').style.display = "none";


// set all scores to zero when the page loads
document.getElementById("score-0").textContent = 0;
document.getElementById("score-1").textContent = 0;
document.getElementById("current-0").textContent = 0;
document.getElementById("current-0").textContent = 0;

document.querySelector('.btn-roll').addEventListener("click", function(){
    // 1. generate a random number
    dice = Math.floor(Math.random() * 6) +1;
    

    // 2. Display that number on the dice
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = "block";
    
    // This is slick.  Because all the image names have a standard convention,
    // we just concatenate whatever the roll was to the "dice-" string and it
    // changes the source to the correct .png

    diceDOM.src = "dice-" + dice +".png";

    // 3. Update the round score if the rolled number was not 1
    
    
    if(dice !== 1){

        //use the activePlayer to point the querySelector to the correct box
        roundScore += dice;
        document.querySelector('#current-'+activePlayer).textContent = roundScore;

    } else {
        // if a 1 is rolled, toggle the activePlayer
        roundScore = 0;
        // ternary operator
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        scores[activePlayer] += roundScore

        document.getElementById('current-0').textContent = 0;
        document.getElementById('current-1').textContent = 0;
    }
    

});
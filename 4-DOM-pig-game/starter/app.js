/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


var scores, roundScore, activePlayer, dice, playerSwap, initFunction, gamePlaying;

gamePlaying = false

initFunction = function(){
    gamePlaying = true;
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;

    document.querySelector('.dice').style.display = "none";

    // set all scores to zero when the page loads
    document.getElementById("score-0").textContent = 0;
    document.getElementById("score-1").textContent = 0;
    document.getElementById("current-0").textContent = 0;
    document.getElementById("current-0").textContent = 0;

    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";

    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.add("active");
}


// Playerswap does all operations necessary to switch players
playerSwap = function(){

    // All the current round's points are lost.
    roundScore = 0;
    // remove class "active" from current active player
    document.querySelector(".player-"+ activePlayer +"-panel").classList.toggle("active");

    // Toggle which player is active
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    // add the "active" class to the new active player's panel
    document.querySelector(".player-"+ activePlayer +"-panel").classList.toggle("active");

     // The elements that display round scores are also set to zero.
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    // hides the dice again.
    document.querySelector('.dice').style.display = "none";

//  This is how the instructor did the active player toggling.
//  document.querySelector(".player-0-panel").classList.toggle("active");
//  document.querySelector(".player-1-panel").classList.toggle("active");    
}



initFunction();




// What do to when someone clicks the Roll Dice button.
document.querySelector('.btn-roll').addEventListener("click", function(){
    if(gamePlaying){
        // 1. generate a random number
        var dice = Math.floor(Math.random() * 6) +1;
        
        // 2. Display that number on the dice
        document.querySelector('.dice').style.display = "block";
        
        // This is slick.  Because all the image names have a standard convention,
        // we just concatenate whatever the roll was to the "dice-" string and it
        // changes the source to the correct .png

        document.querySelector('.dice').src = "dice-" + dice +".png";


        // 3. Update the round score if the rolled number was not 1
        
        if(dice !== 1){

            //Concatenate activePlayer to point the querySelector to the correct box
            roundScore += dice;
            document.querySelector('#current-'+activePlayer).textContent = roundScore;

        } else {playerSwap()}
    }
    

});


document.querySelector(".btn-hold").addEventListener("click", function(){
    
    if (gamePlaying){
     // add the round score to the current active player's score
    scores[activePlayer] += roundScore;

    // Update the displayed score to show the value of newScore
    document.getElementById("score-"+ activePlayer)
    .textContent = scores[activePlayer];

    if (scores[activePlayer] >= 20) {
        gamePlaying = false;
        document.querySelector('.dice').style.display = "none";
        document.getElementById("name-"+activePlayer).textContent = "WINNER!";
        document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
        document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
    } else {

    // switch the player
    playerSwap();

    }


    }


});

document.querySelector(".btn-new").addEventListener("click", initFunction);
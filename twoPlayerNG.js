// ==============================================
// Global Variables
// ==============================================

var rangeMinimum = document.querySelector('#range-minimum');
var rangeMaximum = document.querySelector('#range-maximum');
var lastGuessWas = document.querySelector('.last-guess-was');
var lastGuess = document.querySelector('.last-guess');
var guessesLeft = document.querySelector('.guesses-left');
var wrongNumber = document.querySelector('.wrong-number');
var submitNumber = document.querySelector('.submit-number');
var numberEntered = document.querySelector('.number-entered');
var clearNumber = document.querySelector('.clear-number');
var resetGame = document.querySelector('.reset-game');
var numberReturned = document.querySelector("#number-entered");
var submitButton = document.querySelector(".submit-number");
var errorMessage = document.querySelector("#error-message");
var rangeButton = document.querySelector('#range-button');
var rangePGraph = document.querySelector('.range-paragraph');
var guessCount = 0;
var randomNumber;
var wins = 0;
var rangeMinInt = 1;
var rangeMaxInt = 100;

var playerOneOrTwo = document.querySelector('.player-one-or-two');

// Two player only Variables
var playerOneWinsClass = document.querySelector('.player-one-wins');
var playerTwoWinsClass = document.querySelector('.player-two-wins');
var playerOneGuessesLeft = document.querySelector('.player-one-guesses-left');
var playerTwoGuessesLeft = document.querySelector('.player-two-guesses-left');
var playerTurn = 0;
var playerOneWins = 0;
var playerTwoWins = 0;
var playerOneWrongs = 0;
var playerTwoWrongs = 0;
var playerOneTurns = 0;
var PlayerTwoTurns = 0;



// ==============================================
// Page load function calls
// ==============================================

randomIntFunction();

// ==============================================
// Event Listeners
// ==============================================

//The submit Range button
rangeButton.addEventListener('click', submitRange);

//The submit Guess button
submitButton.addEventListener('click', submitGuessBtn);

//keeps clear button disabled until text has been
  //entered into the Guess input
numberEntered.addEventListener('keyup', function(e) {
  e.preventDefault();
  if (numberEntered.value.length === 0) {
    clearNumber.disabled = true;
  } else {
    clearNumber.disabled = false;
  }
});

//This function will make the clear button clear the text
//in the input field and disables the clear button until something
// has been entered into the input field
clearNumber.addEventListener('click', function() {
  numberEntered.value = '';
  clearNumber.disabled = true;
  event.preventDefault();
});

// ==============================================
// Functions
// ==============================================


//Sets the range on click of the rangeSubmit button
  //and parse the number and make it an integer
function submitRange(e) {
  e.preventDefault();
  console.log("entered min: " + rangeMinimum.value);
  console.log("entered max: " + rangeMaximum.value);
  rangeMaxInt = parseInt(rangeMaximum.value) || 100;
  rangeMinInt = parseInt(rangeMinimum.value) || 1;
  randomIntFunction(rangeMinInt, rangeMaxInt);
  disableReset();
};

//set the random integer and display the current range
function randomIntFunction(rangeMinInt = 1, rangeMaxInt = 100) {
  randomNumber = Math.floor(Math.random() * (rangeMaxInt - rangeMinInt + 1)) + rangeMinInt;
  console.log("minimum: " + rangeMinInt);
  console.log("maximum: " + rangeMaxInt);
  console.log("random number: " + randomNumber);
  var showRange = 'Current Range: ' + rangeMinInt + ' - ' + rangeMaxInt;
  rangePGraph.innerText = showRange;
  };

//On submit guess parse the guessed number and run:
    //ensure the entry is a valid number
    //check if the guess is correct
    //enable the reset button
function submitGuessBtn(e) {
  var parsedNum = parseInt(numberEntered.value);
  e.preventDefault();
  lastGuessWas.innerText = "The last guess was: ";
  if (errorCheck(parsedNum, rangeMinInt, rangeMaxInt) === true) {
    guessCheckTwoPlayer(numberEntered);
    clearNumber.disabled = true;
    numberEntered.value = '';
    disableReset();
  }
};

//disable the reset button until the game has begun
function disableReset() {
  if (playerTurn > 0) {
    resetGame.disabled = false;
  } else if (rangeMaxInt != 100) {
    console.log(rangeMaxInt);
    resetGame.disabled = false;
  } else if (rangeMinInt != 1) {
    console.log(rangeMinInt);
    resetGame.disabled = false;
  } else {
    resetGame.disabled = true;
  }
};

// Make sure a valid number within range
// has been entered into the input area
function errorCheck(numberEntered, rangeMinInt, rangeMaxInt) {
  if (numberEntered === null || isNaN(numberEntered)) {
    window.alert('Please enter an actual number.');
    return false;
  } else if (numberEntered > rangeMaxInt) {
    window.alert('Please enter a number within range.');
    return false;  
  } else if (numberEntered < rangeMinInt) {
    window.alert('Please enter a number within range.');
    return false;
  } else {
    lastGuess.innerText = numberEntered;
    return true;
    return numberEntered;
  }
};

// This is the two player version of the game
function guessCheckTwoPlayer () {
  var parsedNum = parseInt(numberEntered.value);
  if (playerTurn % 2 === 0) {
    playerOneOrTwo.innerText = "Player two's turn";
    checkPlayerOneGuess();
  } else {
    playerOneOrTwo.innerText = "Player one's turn";
    checkPlayerTwoGuess();
  }
};

// Split up the checkGuess function to act individually for each player
  //This is for player 1
function checkPlayerOneGuess() {
  var parsedNum = parseInt(numberEntered.value);
  if (parsedNum === randomNumber) {
    wrongNumber.innerHTML = 'BOOM! Player ONE wins! Guess again!';
    guessesLeft.innerText = 'MAXIMUM + 10, MINIMUM - 10';
    rangeMinInt -= (10);
    rangeMaxInt += (10);
    wins += 1;
    playerOneWins++;
    playerOneWinsClass.innerText = playerOneWins;
    randomIntFunction(rangeMinInt, rangeMaxInt);
    } else if (playerOneWrongs === 9) {
    guessesLeft.innerText = "Game Over, too many wrong guesses for player one."
    wrongNumber.innerText = '';
    submitNumber.disabled = true;
  } else {
    playerTurn++;
    guessCount++;
    playerOneWrongs++;
    playerOneGuessesLeft.innerText = (10-playerOneWrongs);
    guessesLeft.innerText = "Player One, you have " + (10-playerOneWrongs) + " guesses left.";
    if (parsedNum < randomNumber) {
      wrongNumber.innerText = "Too low";
    } else if (parsedNum > randomNumber) {
      wrongNumber.innerText = "Too high";
    }
  }
}

// Split up the checkGuess function to act individually for each playerTurn
  // This is for player 2
function checkPlayerTwoGuess() {
  var parsedNum = parseInt(numberEntered.value);
  if (parsedNum === randomNumber) {
    wrongNumber.innerHTML = 'BOOM! Player TWO wins! Guess again!';
    guessesLeft.innerText = 'MAXIMUM + 10, MINIMUM - 10';
    rangeMinInt -= (10);
    rangeMaxInt += (10);
    wins += 1;
    playerTwoWins++;
    playerTwoWinsClass.innerText = playerTwoWins;
    randomIntFunction(rangeMinInt, rangeMaxInt);
  } else if (playerTwoWrongs === 9) {
    guessesLeft.innerText = "Game Over, too many wrong guesses for player two."
    wrongNumber.innerText = '';
    submitNumber.disabled = true;
  } else {
    playerTurn++;
    guessCount++;
    playerTwoWrongs++;
    playerTwoGuessesLeft.innerText = (10-playerTwoWrongs);
    guessesLeft.innerText = "Player Two, you have " + (10-playerTwoWrongs) + " guesses left.";
    if (parsedNum < randomNumber) {
      wrongNumber.innerText = "Too low";
    } else if (parsedNum > randomNumber) {
      wrongNumber.innerText = "Too high";
    }
  }

}

/* Desired Changes: 

Pop up error message titles

create a toggle for one player or two player

*/































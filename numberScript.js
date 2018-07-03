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
var guessCount = 0;
var numberReturned = document.querySelector("#number-entered");
var submitButton = document.querySelector(".submit-number");
var errorMessage = document.querySelector("#error-message");
var rangeButton = document.querySelector('#range-button');
var randomNumber;
var rangePGraph = document.querySelector('.range-paragraph');
var wins = 0;
var rangeMinInt = 1;
var rangeMaxInt = 100;

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
  var showRange = 'Range: ' + rangeMinInt + ' - ' + rangeMaxInt;
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
    guessCheck(numberEntered);
    clearNumber.disabled = true;
    numberEntered.value = '';
    disableReset(guessCount);
    // whosTurn(numberEntered);
  }
};

// This will be the main function for the guess button
// This is the one player game
function guessCheck() {
  var parsedNum = parseInt(numberEntered.value);
  if (parsedNum === randomNumber) {
    wrongNumber.innerHTML = 'BOOM!';
    wrongNumber.style.fontSize = '4em';
    wrongNumber.style.fontWeight = 'bold';
    wrongNumber.style.margin = '-20px auto auto';
    guessesLeft.innerText = 'MAXIMUM + 10, MINIMUM - 10';
    rangeMinInt -= (10);
    rangeMaxInt += (10);
    wins += 1;
    randomIntFunction(rangeMinInt, rangeMaxInt);
    rangePGraph.innerText = 'New Range: ' + rangeMinInt + ' - ' + rangeMaxInt;
    rangePGraph.style.color = '#ED458B';
    rangePGraph.style.fontSize = '2em';
    lastGuessWas.style.margin = '10px auto -10px auto';
  } else if (guessCount === 9) {
    guessesLeft.innerText = "Game Over, too many guesses."
    wrongNumber.innerText = '';
    submitNumber.disabled = true;
  } else {
    guessesLeft.innerText = "You have " + (9-guessCount) + " guesses left.";
    wrongNumber.style.fontSize = '1.5em';
    wrongNumber.style.fontWeight = '';
    rangePGraph.style.color = 'black';
    rangePGraph.style.fontSize = '1em';
    rangePGraph.innerText = 'Current Range: ' + rangeMinInt + ' - ' + rangeMaxInt;
    if (parsedNum < randomNumber) {
      wrongNumber.innerText = "Too low";
      guessCount++;
    } else if (parsedNum > randomNumber) {
      wrongNumber.innerText = "Too high";
      guessCount++;
    }
  }
};

//disable the reset button until the game has begun
function disableReset() {
  if (guessCount > 0) {
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
    errorMessage.innerText = 'Thanks';
    lastGuess.innerText = numberEntered;
    return true;
    return numberEntered;
  }
};







/* Desired Changes: 

Pop up error message titles

create a toggle for one player or two player

*/































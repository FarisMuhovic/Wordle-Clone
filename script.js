import { WORDS } from "./words.js";

const board = document.getElementById("board");
// 1 row has 5 cols
// 6 rows max
for (let i = 0; i < 6; i++) {
  board.innerHTML += `<div id="rows" class="row">
    <div class="tile" id="tile">
    </div>
    <div class="tile" id="tile">
    </div>
    <div class="tile" id="tile">
    </div>
    <div class="tile" id="tile">
    </div>
    <div class="tile" id="tile">
    </div>
  </div>`;
}
// generate word to guess from words.js list
let wordToGuess = WORDS[Math.floor(Math.random() * WORDS.length)];
console.log(wordToGuess);
// get all the buttons
const keyboard = document.querySelectorAll("#keyboard div button");
let guess = "";
let arrayofGuesses = [[], [], [], [], [], []];
let rowcount = 0;
// keyboard buttons pressed value
keyboard.forEach(key => {
  key.addEventListener("click", e => {
    // make the guess string a 5 letter word
    guess += e.target.innerText;
    console.log(guess);
    //  check if the guess length is 5
    if (guess.length == 5) {
      // if the words list contains that guess move on
      if (WORDS.includes(guess.toLowerCase())) {
        WORDS.forEach(word => {
          // find the word that is equal to the guess
          if (guess.toLowerCase() == word) {
            // put it in the array as row guess.
            arrayofGuesses[rowcount].splice(0, 0, guess);
            console.log(arrayofGuesses);
            // reset the guess because we dont need it anymore
            guess = "";
            // increase the row count so the next word can be put in the nth row line
            rowcount++;
            // if the guess is equal to the word we need to guess end the game and declare a win
            if (word == wordToGuess) {
              console.log("you guessed it, the word is", wordToGuess);
            } 
            // check if that word has letters in the final(given) word
            for (let i = 0; i < word.length; i++) {
              if (wordToGuess.includes(word[i])) {
                // now the word has those letters now check the order
                // if the order of the word is ok make it green
                if (wordToGuess[i] == word[i]) {
                  console.log(word[i], "you guessed it in the right order.");
                }
                // if its not in the order make it orange
                else {
                  console.log(
                    word[i],
                    "The letter is there but not in the right order."
                  );
                }
              }
            }
            // no else statement it is ilogical
          }
        });
        // if it doesent contain that word somehow reset the guess
      } else {
        console.log("it is not in words list");
        guess = "";
      }
    } // else do nothing
  });
});
// transform the es6 arrow function into normal function for better usage in keyboard typing.

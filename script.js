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
const keyboard = document.querySelectorAll("#keyboard div button");
let guess = "";
let wordcount = 0;
// key pressed value
keyboard.forEach(key => {
  key.addEventListener("click", e => {
    // console.log(e.target.innerText);
    if (e.target.innerText != "DEL" || e.target.innerText != "ENTER") {
      wordcount++;
      // console.log(wordcount)
    }
    if (guess.length < 5) {
      guess += e.target.innerText;
    }
    // checks if the user guessed a word in the system
    if (guess.length == 5) {
      WORDS.forEach(word => {
        if (guess.toLowerCase() == word) {
          // console.log(word);
          //now check if that word has letters in the final(given) word
          for (let i = 0; i < word.length; i++) {
            // console.log(word[i])
            if (wordToGuess.includes(word[i])) {
              // console.log(word[i])
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
        }
      });
    }
  });
});

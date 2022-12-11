import { WORDS } from "./words.js";

const board = document.getElementById("board");
const deficitLettersModul = document.getElementById("deficitLetters");
const notInWordListModul = document.getElementById("notInWordList");
const statisticsModul = document.getElementById("statistics");
// 1 row has 5 cols
// 6 rows max
for (let i = 0; i < 6; i++) {
  board.innerHTML += `<div class="row">
    <div class="tile">
    </div>
    <div class="tile">
    </div>
    <div class="tile">
    </div>
    <div class="tile">
    </div>
    <div class="tile">
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
let guessCount = 0;
const alphabet = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
// statistics
let played = 0;
let winrate = 0;
let streak = 0;
window.addEventListener("keyup", e => {
  appLogic(e, "keyboard");
});
keyboard.forEach(key => {
  key.onclick = appLogic;
});
function appLogic(e, inputtype) {
  let boardDivs = board.childNodes[rowcount].childNodes;
  let filteredBoardDivs = [];
  for (let i = 0; i < boardDivs.length; i++) {
    if (i % 2 != 0) {
      filteredBoardDivs.splice(i, 0, boardDivs[i]);
    }
  }
  console.log(board.childNodes[rowcount]);
  if (inputtype == "keyboard") {
    let keypressed = e.key.toLowerCase();
    console.log(keypressed);
    if (guess.length < 5 && alphabet.includes(keypressed)) {
      filteredBoardDivs[guessCount].innerText = keypressed.toUpperCase();
      guess += keypressed;
      guessCount++;
    } else if (keypressed == "enter" && guess.length == 5) {
      console.log("check word");
      if (WORDS.includes(guess)) {
        console.log(guess, "the word is in the system");
        arrayofGuesses[rowcount].splice(0, 0, guess);
        console.log(arrayofGuesses);
        for (let i = 0; i < guess.length; i++) {
          filteredBoardDivs[i].classList.add("tileborder");
          console.log(guess[i]);
          if (wordToGuess.includes(guess[i])) {
            if (guess == wordToGuess) {
              console.log("you guessed it, the word is", wordToGuess);
              document.getElementById("keyboard").classList.add("afterwin");
              board.childNodes[rowcount].classList.add("winanimation");
              setTimeout(() => {
                statisticsModul.style.display = "grid";
              }, 3500);
              console.log(board.childNodes[rowcount]);
              // disable the board after the win
              rowcount = null;
            }
            if (wordToGuess[i] == guess[i]) {
              console.log(guess[i], "you guessed it in the right order.");
              filteredBoardDivs[i].style.backgroundColor = "green";
            } else {
              console.log(
                guess[i],
                "The letter is there but not in the right order."
              );
              filteredBoardDivs[i].style.backgroundColor = "rgb(219, 143, 0)";
            }
          }
        }
        rowcount++;
        guessCount = 0;
        guess = "";
      } else {
        console.log("invalid word");
        notInWordListModul.style.display = "block";
        setTimeout(() => {
          notInWordListModul.style.display = "none";
        }, 1000);
      }
      console.log(rowcount);
    } else if (
      keypressed == "backspace" &&
      guess.length > 0 &&
      guessCount > 0
    ) {
      console.log("del last word");
      guessCount--;
      filteredBoardDivs[guessCount].innerText = "";
      guess = guess.slice(0, -1);
      console.log(guess);
    } else if (guess.length < 5) {
      deficitLettersModul.style.display = "block";
      setTimeout(() => {
        deficitLettersModul.style.display = "none";
      }, 1000);
    }
  } else {
    let keypressed = e.target.innerText.toLowerCase();
    console.log(keypressed);
    if (guess.length < 5 && alphabet.includes(keypressed)) {
      filteredBoardDivs[guessCount].innerText = keypressed.toUpperCase();
      guess += keypressed;
      guessCount++;
    } else if (keypressed == "enter" && guess.length == 5) {
      console.log("check word");
      if (WORDS.includes(guess)) {
        console.log(guess, "the word is in the system");
        arrayofGuesses[rowcount].splice(0, 0, guess);
        console.log(arrayofGuesses);
        for (let i = 0; i < guess.length; i++) {
          filteredBoardDivs[i].classList.add("tileborder");
          console.log(guess[i]);
          if (wordToGuess.includes(guess[i])) {
            if (guess == wordToGuess) {
              console.log("you guessed it, the word is", wordToGuess);
              document.getElementById("keyboard").classList.add("afterwin");
              board.childNodes[rowcount].classList.add("winanimation");
              setTimeout(() => {
                statisticsModul.style.display = "grid";
              }, 3500);
              console.log(board.childNodes[rowcount]);
              // disable the board after the win
              rowcount = null;
            }
            if (wordToGuess[i] == guess[i]) {
              console.log(guess[i], "you guessed it in the right order.");
              filteredBoardDivs[i].style.backgroundColor = "green";
            } else {
              console.log(
                guess[i],
                "The letter is there but not in the right order."
              );
              filteredBoardDivs[i].style.backgroundColor = "rgb(219, 143, 0)";
            }
          }
        }
        rowcount++;
        guessCount = 0;
        guess = "";
      } else {
        console.log("invalid word");
        notInWordListModul.style.display = "block";
        setTimeout(() => {
          notInWordListModul.style.display = "none";
        }, 1000);
      }
      console.log(rowcount);
    } else if (keypressed == "del" && guess.length > 0 && guessCount > 0) {
      console.log("del last word");
      guessCount--;
      filteredBoardDivs[guessCount].innerText = "";
      guess = guess.slice(0, -1);
      console.log(guess);
    } else if (guess.length < 5) {
      deficitLettersModul.style.display = "block";
      setTimeout(() => {
        deficitLettersModul.style.display = "none";
      }, 1000);
    }
  }
  console.log(guess);
  console.log(guessCount);
}
/// and pop up the statisctics
const exitStatsBtn = document.getElementById("exitStats");
exitStatsBtn.addEventListener("click", () => {
  statisticsModul.style.display = "none";
});
const playAgain = document.getElementById("playAgain");
playAgain.addEventListener("click", () => {
  location.reload();
});

// player loses
// make statistics work
// local storage

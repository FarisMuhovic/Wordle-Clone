import { WORDS } from "./words.js";

const board = document.getElementById("board");
const deficitLettersModul = document.getElementById("deficitLetters");
const notInWordListModul = document.getElementById("notInWordList");
const statisticsModul = document.getElementById("statistics");
const winLoseText = document.getElementById("winLoseText");
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
const winRateUI = document.getElementById("winrate");
const gamesPlayedUI = document.getElementById("gamesPlayed");
const streakUI = document.getElementById("streak");

let played = null;
if (localStorage.getItem("gamesPlayed") != null) {
  played = localStorage.getItem("gamesPlayed");
} else {
  played = 0;
}

let wins = null;
if (localStorage.getItem("wins") != null) {
  wins = localStorage.getItem("wins");
} else {
  wins = 0;
}

let losses = null;
if (localStorage.getItem("losses") != null) {
  losses = localStorage.getItem("losses");
} else {
  losses = 0;
}

let winrate = (wins / played) * 100;
if (winrate == NaN) {
  winrate = 0;
}
let streak = null;
if (localStorage.getItem("streak") != null) {
  streak = localStorage.getItem("streak");
} else {
  streak = 0;
}
gamesPlayedUI.innerHTML = localStorage.getItem("gamesPlayed");
streakUI.innerHTML = localStorage.getItem("streak");
winRateUI.innerHTML = Math.round(winrate, 2);
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
  if (inputtype == "keyboard") {
    let keypressed = e.key.toLowerCase();
    if (guess.length < 5 && alphabet.includes(keypressed)) {
      filteredBoardDivs[guessCount].innerText = keypressed.toUpperCase();
      guess += keypressed;
      guessCount++;
    } else if (keypressed == "enter" && guess.length == 5) {
      if (WORDS.includes(guess)) {
        arrayofGuesses[rowcount].splice(0, 0, guess);
        if (arrayofGuesses[5].length == 1 && !wordToGuess.includes(guess)) {
          played++;
          streak = 0;
          losses++;
          localStorage.setItem("gamesPlayed", played);
          localStorage.setItem("losses", losses);
          localStorage.setItem("streak", streak);
          gamesPlayedUI.innerHTML = localStorage.getItem("gamesPlayed");
          streakUI.innerHTML = localStorage.getItem("streak");
          winrate = (wins / played) * 100;
          winRateUI.innerHTML = Math.round(winrate, 2);
          setTimeout(() => {
            statisticsModul.style.display = "grid";
          }, 3500);
          winLoseText.innerHTML = `You failed,The word was ${wordToGuess}.`;
        }
        for (let i = 0; i < guess.length; i++) {
          filteredBoardDivs[i].classList.add("tileborder");
          if (wordToGuess.includes(guess[i])) {
            if (guess == wordToGuess) {
              document.getElementById("keyboard").classList.add("afterwin");
              board.childNodes[rowcount].classList.add("winanimation");
              setTimeout(() => {
                statisticsModul.style.display = "grid";
              }, 3500);
              // disable the board after the win
              rowcount = null;
              played++;
              streak++;
              wins++;
              localStorage.setItem("gamesPlayed", played);
              localStorage.setItem("wins", wins);
              localStorage.setItem("streak", streak);
              gamesPlayedUI.innerHTML = localStorage.getItem("gamesPlayed");
              streakUI.innerHTML = localStorage.getItem("streak");
              winrate = (wins / played) * 100;
              winRateUI.innerHTML = Math.round(winrate, 2);
              winLoseText.innerHTML = `You guessed It,The word was ${wordToGuess}.`;
            }
            if (wordToGuess[i] == guess[i]) {
              filteredBoardDivs[i].style.backgroundColor = "green";
            } else {
              filteredBoardDivs[i].style.backgroundColor = "rgb(219, 143, 0)";
            }
          }
        }
        rowcount++;
        guessCount = 0;
        guess = "";
      } else {
        notInWordListModul.style.display = "block";
        setTimeout(() => {
          notInWordListModul.style.display = "none";
        }, 1000);
      }
    } else if (
      keypressed == "backspace" &&
      guess.length > 0 &&
      guessCount > 0
    ) {
      guessCount--;
      filteredBoardDivs[guessCount].innerText = "";
      guess = guess.slice(0, -1);
    } else if (guess.length < 5) {
      deficitLettersModul.style.display = "block";
      setTimeout(() => {
        deficitLettersModul.style.display = "none";
      }, 1000);
    }
  } else {
    let keypressed = e.target.innerText.toLowerCase();
    if (guess.length < 5 && alphabet.includes(keypressed)) {
      filteredBoardDivs[guessCount].innerText = keypressed.toUpperCase();
      guess += keypressed;
      guessCount++;
    } else if (keypressed == "enter" && guess.length == 5) {
      if (WORDS.includes(guess)) {
        arrayofGuesses[rowcount].splice(0, 0, guess);
        if (arrayofGuesses[5].length == 1 && !wordToGuess.includes(guess)) {
          played++;
          streak = 0;
          losses++;
          localStorage.setItem("gamesPlayed", played);
          localStorage.setItem("losses", losses);
          localStorage.setItem("streak", streak);
          gamesPlayedUI.innerHTML = localStorage.getItem("gamesPlayed");
          streakUI.innerHTML = localStorage.getItem("streak");
          winrate = (wins / played) * 100;
          winRateUI.innerHTML = Math.round(winrate, 2);
          setTimeout(() => {
            statisticsModul.style.display = "grid";
          }, 3500);
          winLoseText.innerHTML = `You failed,The word was ${wordToGuess}.`;
        }
        for (let i = 0; i < guess.length; i++) {
          filteredBoardDivs[i].classList.add("tileborder");
          if (wordToGuess.includes(guess[i])) {
            if (guess == wordToGuess) {
              document.getElementById("keyboard").classList.add("afterwin");
              board.childNodes[rowcount].classList.add("winanimation");
              setTimeout(() => {
                statisticsModul.style.display = "grid";
              }, 3500);
              // disable the board after the win
              rowcount = null;
              played++;
              streak++;
              wins++;
              localStorage.setItem("gamesPlayed", played);
              localStorage.setItem("wins", wins);
              localStorage.setItem("streak", streak);
              gamesPlayedUI.innerHTML = localStorage.getItem("gamesPlayed");
              streakUI.innerHTML = localStorage.getItem("streak");
              winrate = (wins / played) * 100;
              winRateUI.innerHTML = Math.round(winrate, 2);
              winLoseText.innerHTML = `You guessed It,The word was ${wordToGuess}.`;
            }
            if (wordToGuess[i] == guess[i]) {
              filteredBoardDivs[i].style.backgroundColor = "green";
            } else {
              filteredBoardDivs[i].style.backgroundColor = "rgb(219, 143, 0)";
            }
          }
        }
        rowcount++;
        guessCount = 0;
        guess = "";
      } else {
        notInWordListModul.style.display = "block";
        setTimeout(() => {
          notInWordListModul.style.display = "none";
        }, 1000);
      }
    } else if (keypressed == "del" && guess.length > 0 && guessCount > 0) {
      guessCount--;
      filteredBoardDivs[guessCount].innerText = "";
      guess = guess.slice(0, -1);
    } else if (guess.length < 5) {
      deficitLettersModul.style.display = "block";
      setTimeout(() => {
        deficitLettersModul.style.display = "none";
      }, 1000);
    }
  }
}

const exitStatsBtn = document.getElementById("exitStats");
exitStatsBtn.addEventListener("click", () => {
  statisticsModul.style.display = "none";
});
const playAgain = document.getElementById("playAgain");
playAgain.addEventListener("click", () => {
  location.reload();
});

const label = document.getElementById("labels");

label.addEventListener("change", e => {
  localStorage.setItem("mode", e.target.checked);
  themeMode(e.target.checked);
});

themeMode(localStorage.getItem("mode"));
if (localStorage.getItem("mode") == "false") {
  document.getElementById("checky").checked = false;
} else {
  document.getElementById("checky").checked = true;
}
function themeMode(boolVal) {
  if (boolVal == false || boolVal == "false") {
    // dark mode
    document.documentElement.style.setProperty("--bg-color", "rgb(29, 29, 29");
    document.documentElement.style.setProperty(
      "--tiles-color",
      "rgb(49, 49, 49)"
    );
    document.documentElement.style.setProperty(
      "--font-color",
      "rgb(221, 221, 221)"
    );
    document.documentElement.style.setProperty(
      "--nav-border",
      "rgb(102, 102, 102)"
    );
    document.documentElement.style.setProperty(
      "--tile-hover-color",
      "rgb(134, 133, 133)"
    );
    document.documentElement.style.setProperty(
      "--stats-bg-color",
      "rgba(0, 0, 0, 0.877)"
    );
  } else if (boolVal == true || boolVal == "true") {
    //light mode
    document.documentElement.style.setProperty(
      "--bg-color",
      "rgb(233, 233, 233)"
    );
    document.documentElement.style.setProperty(
      "--tiles-color",
      "rgb(233, 233, 233)"
    );
    document.documentElement.style.setProperty("--font-color", "rgb(0, 0, 0)");
    document.documentElement.style.setProperty(
      "--nav-border",
      "rgb(22, 22, 22)"
    );
    document.documentElement.style.setProperty(
      "--stats-bg-color",
      "rgba(255, 255, 255, 0.377)"
    );
  }
}

const navChart = document.getElementById("statsClick");
navChart.addEventListener("click", () => {
  statisticsModul.style.display = "grid";
});

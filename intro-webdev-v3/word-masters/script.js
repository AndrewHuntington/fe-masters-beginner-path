// Global Variables
let row = 0;
let offset = 0;
let currentGuess = [];
const gameBoard = document.querySelector(".game-wrapper");
let isValidWord = false;
let gameOver = false;

function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}

async function getWordOfTheDay() {
  document.querySelector(".loader").classList.remove("hidden");

  const response = await fetch("https://words.dev-apis.com/word-of-the-day");
  const data = await response.json();

  document.querySelector(".loader").classList.add("hidden");

  return data.word.toUpperCase();
}

async function validateWord(guess) {
  const word = guess.join("");
  document.querySelector(".loader").classList.remove("hidden");

  const response = await fetch("https://words.dev-apis.com/validate-word", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ word }),
  });

  const result = await response.json();
  document.querySelector(".loader").classList.add("hidden");

  return result.validWord;
}

function compareWords(currentGuess = [], wordOfTheDay = "") {
  if (currentGuess.join("") === wordOfTheDay) {
    alert("You win!");
    gameOver = true;
  }

  // First, set all boxes to gray (character not in answer)
  for (let i = 0; i < 5; i++) {
    document.querySelector(`.box-${i + offset}`).classList.add("grey-box");
  }

  // Next, if characters are in answer, replace gray with appropriate color
  for (let index = 0; index < 5; index++) {
    // If the player guesses a letter that is in the right place, it is shown as green
    if (currentGuess[index] === wordOfTheDay[index]) {
      document
        .querySelector(`.box-${index + offset}`)
        .classList.replace("grey-box", "green-box");

      continue;
    }

    // If the player guesses a letter that is in the word but not in the right place, it is shown as yellow
    // It does account for however many of the letter exist in the word
    if (currentGuess.includes(wordOfTheDay[index])) {
      const i = currentGuess.indexOf(wordOfTheDay[index]);

      console.log(i + offset);
      document
        .querySelector(`.box-${i + offset}`)
        .classList.replace("grey-box", "orange-box");
    }
  }
}

async function init() {
  const wordOfTheDay = await getWordOfTheDay();

  gameBoard.setAttribute("tabindex", "0");

  gameBoard.addEventListener("keydown", async (e) => {
    if (gameOver) return;

    // handle 'Backspace'
    if (e.key === "Backspace") {
      if (currentGuess.length > 0) {
        currentGuess.length -= 1;

        document.querySelector(
          `.box-${currentGuess.length + offset}`
        ).innerHTML = "";
      }
    }

    // handle 'Enter'
    if (e.key === "Enter") {
      if (currentGuess.length === 5 && row < 6) {
        isValidWord = await validateWord(currentGuess);

        if (isValidWord) {
          // TODO: handle word comparison
          compareWords(currentGuess, wordOfTheDay);

          currentGuess = [];
          row++;
          offset = row * 5;

          if (row === 6 && !gameOver) {
            alert(`You lose! The word was: ${wordOfTheDay}`);
            gameOver = true;
          }
        }
      } else {
        e.preventDefault();
      }
    }

    // handle valid letter input
    if (isLetter(e.key) && currentGuess.length < 5 && row < 6) {
      currentGuess.push(e.key.toUpperCase());
    }

    // update game board
    for (let i = 0; i < 5; i++) {
      if (currentGuess[i]) {
        document.querySelector(`.box-${i + offset}`).innerHTML =
          currentGuess[i];
      }
    }
  });
}

init();

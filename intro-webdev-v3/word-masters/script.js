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

async function init() {
  let row = 0;
  let offset = 0;
  let currentGuess = [];
  const gameBoard = document.querySelector(".game-wrapper");
  const wordOfTheDay = await getWordOfTheDay();
  let isValidWord = false;
  console.log({ wordOfTheDay });

  gameBoard.setAttribute("tabindex", "0");

  gameBoard.addEventListener("keydown", async (e) => {
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
          currentGuess = [];
          row++;
          offset = row * 5;

          // TODO: handle word comparison
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

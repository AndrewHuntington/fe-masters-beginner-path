// number to display to the user
let displayNumber = 0;
// background total; may differ from what is currently displayed
let total = 0;
let lastOperand = null;

const display = document.querySelector(".number-display");
display.innerHTML = displayNumber;

function clear() {
  total = 0;
  displayNumber = 0;
  display.innerHTML = displayNumber;
}

function updateDisplay(value) {
  if (+display.innerHTML === 0) {
    display.innerHTML = value;
  } else {
    display.innerHTML += value;
  }
  displayNumber = +display.innerHTML;
}

function add() {
  total += +displayNumber;
  // TODO: bug here
  displayNumber = 0;
  display.innerHTML = displayNumber;
  lastOperand = "+";

  // console.log({ total });
}

function equals() {
  if (!lastOperand) return;

  if (lastOperand === "+") {
    total += displayNumber;
  }

  if (lastOperand === "-") {
    total -= displayNumber;
  }

  if (lastOperand === "*") {
    total *= displayNumber;
  }

  if (lastOperand === "/") {
    total /= displayNumber;
  }

  // console.log({ total });
  displayNumber = total;
  display.innerHTML = displayNumber;
}

const calc = document.querySelector(".calculator");
Array.from(calc.children).forEach((e) => {
  if (e.className === "display") return;

  e.addEventListener("click", (e) => {
    const op = e.target.className.split(" ")[0];
    const enteredValue = e.target.innerHTML;
    console.log(e.target.innerHTML);

    switch (op) {
      case "clear":
        clear();
        break;
      case "plus":
        add(enteredValue);
        break;
      case "equal":
        equals();
        break;
      case "zero":
        updateDisplay(enteredValue);
        break;
      case "one":
        updateDisplay(enteredValue);
        break;
      case "two":
        updateDisplay(enteredValue);
        break;
      case "three":
        updateDisplay(enteredValue);
        break;
      case "four":
        updateDisplay(enteredValue);
        break;
      case "five":
        updateDisplay(enteredValue);
        break;
      case "six":
        updateDisplay(enteredValue);
        break;
      case "seven":
        updateDisplay(enteredValue);
        break;
      case "eight":
        updateDisplay(enteredValue);
        break;
      case "nine":
        updateDisplay(enteredValue);
        break;
      default:
        break;
    }
  });
});

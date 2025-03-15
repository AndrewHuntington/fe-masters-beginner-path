// setup values
let displayNumber = 0; // number to display to the user
let total = 0; // background total; may differ from what is currently displayed
let operator,
  operandA,
  operandB = null;
const display = document.querySelector(".number-display");
display.innerHTML = displayNumber;

// functions
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

function backspace() {
  if (display.innerHTML === "0") return;

  if (display.innerHTML.length > 1) {
    display.innerHTML = display.innerHTML.slice(
      0,
      display.innerHTML.length - 1
    );
  } else {
    display.innerHTML = "0";
  }

  return;
}

// operations
function add() {}

function subtract() {}

function divide() {}

function multiply() {}

function equals() {}

// setup calculator event handlers
const calc = document.querySelector(".calculator");
Array.from(calc.children).forEach((e) => {
  if (e.className === "display") return;

  e.addEventListener("click", (e) => {
    const op = e.target.className.split(" ")[0];
    const enteredValue = e.target.innerHTML;
    console.log({ enteredValue });

    switch (op) {
      case "clear":
        clear();
        break;
      case "back":
        backspace();
        break;
      case "plus":
        // add
        break;
      case "minus":
        // sub
        break;
      case "divide":
        // div
        break;
      case "multiply":
        // multi
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

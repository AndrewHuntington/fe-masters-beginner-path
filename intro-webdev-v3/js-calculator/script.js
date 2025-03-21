// setup values / initiate global variables
let displayNumber = 0; // number to display to the user
let total = 0; // background total; may differ from what is currently displayed
const inputHistory = [];
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

function equals() {
  inputHistory.push(displayNumber);

  if (inputHistory.includes("+")) {
    total = inputHistory[0] + inputHistory[2];
    displayNumber = total;
    display.innerHTML = displayNumber;
  }

  if (inputHistory.includes("-")) {
    total = inputHistory[0] - inputHistory[2];
    displayNumber = total;
    display.innerHTML = displayNumber;
  }

  if (inputHistory.includes("/")) {
    total = inputHistory[0] / inputHistory[2];
    displayNumber = total;
    display.innerHTML = displayNumber;
  }

  if (inputHistory.includes("*")) {
    total = inputHistory[0] * inputHistory[2];
    displayNumber = total;
    display.innerHTML = displayNumber;
  }

  inputHistory.length = 0;
}

function includesOperator() {
  const operators = /[+\-*/]/;
  return inputHistory.some((item) => operators.test(item));
}

function handleOperation(operator) {
  inputHistory.push(displayNumber);
  if (includesOperator()) {
    doMath();
  }

  inputHistory.push(operator);

  displayNumber = 0;
  display.innerHTML = displayNumber;
}

function doMath() {
  if (inputHistory.includes("+")) {
    total = inputHistory[0] + inputHistory[2];
  }

  if (inputHistory.includes("-")) {
    total = inputHistory[0] - inputHistory[2];
  }

  if (inputHistory.includes("*")) {
    total = inputHistory[0] * inputHistory[2];
  }

  if (inputHistory.includes("/")) {
    total = inputHistory[0] / inputHistory[2];
  }

  displayNumber = total;
  display.innerHTML = displayNumber;

  inputHistory.length = 0;
  inputHistory.push(total);
}

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
        handleOperation("+");
        break;
      case "minus":
        // sub
        handleOperation("-");
        break;
      case "divide":
        // div
        handleOperation("/");
        break;
      case "multiply":
        // multi
        handleOperation("*");
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

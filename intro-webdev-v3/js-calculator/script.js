// number to display to the user
let displayNumber = 0;
// background total; may differ from what is currently displayed
let total = 0;

const display = document.querySelector(".number-display");
display.innerHTML = displayNumber;

const calc = document.querySelector(".calculator");

Array.from(calc.children).forEach((e) => {
  if (e.className === "display") return;

  e.addEventListener("click", (e) => {
    console.log(e.target.className.split(" ")[0]);
  });
});

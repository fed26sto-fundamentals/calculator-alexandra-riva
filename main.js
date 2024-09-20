//Variables
const historyDisplay = document.querySelector(".history");
const currentDisplay = document.querySelector(".current");
const buttons = document.querySelectorAll(".btn");

//default values

let firstNum = "";
let secondNum = "";
let operator = null;
let shouldResetDisplay = false;

currentDisplay.textContent = "0";

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const action = button.dataset.action;
        const value = button.dataset.value;
        
        if (!action) {
            updateDisplay(value); 
        } else if (action === "clear") {
            clear(); 
        } else if (action === "delete") {
            deleteNumber(); 
        } else if (action === "decimal") {
            addDecimal(); 
        } else if (action === "operator") {
            handleOperator(value); 
        } else if (action === "calculate") {
            calculate(); 
        } else if (action === "plusminus") {
            toggleSign();
        }
    });
});

function updateDisplay(value) {
    if (shouldResetDisplay) {
        clear(); 
        shouldResetDisplay = false;
    }

    if (value === "." && currentDisplay.textContent.includes(".")) {
        return; 
    } else if (value !== ".") {
        currentDisplay.textContent = currentDisplay.textContent === "0" ? value : currentDisplay.textContent + value; 
    }

    adjustFontSize(currentDisplay);
}

function reset () {
    currentDisplay.textContent = "";
    shouldResetDisplay = false;
    currentDisplay.classList.remove ("long-text", "longer-text");
    adjustFontSize(currentDisplay)
}

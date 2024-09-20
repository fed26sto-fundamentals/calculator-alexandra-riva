// Variables
const historyDisplay = document.querySelector(".history");
const currentDisplay = document.querySelector(".current");
const buttons = document.querySelectorAll(".btn");

// Default values
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
    if (shouldResetDisplay) reset();

    if (value === "." && currentDisplay.textContent.includes(".")) return;
    
    currentDisplay.textContent = currentDisplay.textContent === "0" ? value : currentDisplay.textContent + value;

    adjustFontSize(currentDisplay);
}

function reset() {
    currentDisplay.textContent = "0";
    shouldResetDisplay = false;
    currentDisplay.classList.remove("long-text", "longer-text");
    adjustFontSize(currentDisplay);
}

function clear() {
    currentDisplay.textContent = "0";
    historyDisplay.textContent = "";
    firstNum = "";
    secondNum = "";
    operator = null;
    shouldResetDisplay = false;
    adjustFontSize(currentDisplay);
}

function deleteNumber() {
    if (currentDisplay.textContent.length > 1) {
        currentDisplay.textContent = currentDisplay.textContent.slice(0, -1);
    } else {
        currentDisplay.textContent = "0";
    }
    adjustFontSize(currentDisplay);
}

function addDecimal() {
    if (shouldResetDisplay) reset();
    if (!currentDisplay.textContent.includes(".")) {
        currentDisplay.textContent += ".";
    }
}

function handleOperator(operation) {
    if (operator !== null) calculate();

    firstNum = currentDisplay.textContent;
    operator = operation;
    shouldResetDisplay = true;
}

function calculate() {
    if (operator === null || firstNum === "") return;

    secondNum = currentDisplay.textContent;
    const result = operate(operator, parseFloat(firstNum), parseFloat(secondNum));

    currentDisplay.textContent = result === Infinity ? "Can't divide by zero!" : roundNumber(result);
    historyDisplay.textContent = `${firstNum} ${operator} ${secondNum}`;
    operator = null;
    firstNum = currentDisplay.textContent;
    shouldResetDisplay = true;
    adjustFontSize(currentDisplay);
}

function roundNumber(num) {
    return Math.round(num * 10000) / 10000;
}

function operate(operator, a, b) {
    switch (operator) {
        case "+":
            return a + b;
        case "-":
            return a - b;
        case "*":
            return a * b;
        case "/":
            return b !== 0 ? a / b : Infinity;
        default:
            return null;
    }
}

function toggleSign() {
    const currentValue = parseFloat(currentDisplay.textContent);
    if (!isNaN(currentValue)) {
        currentDisplay.textContent = roundNumber(currentValue * -1);
    }
    adjustFontSize(currentDisplay);
}

function adjustFontSize(element) {
    const textLength = element.textContent.length;
    if (textLength > 14) {
        element.style.fontSize = "1.5rem";
    } else if (textLength > 10) {
        element.style.fontSize = "1.75rem";
    } else {
        element.style.fontSize = "2rem";
    }
}

document.addEventListener("keydown", (e) => {
    if (!isNaN(e.key)) {
        updateDisplay(e.key);
    } else if (e.key === ".") {
        addDecimal();
    } else if (e.key === "Enter" || e.key === "=") {
        calculate();
    } else if (e.key === "Backspace") {
        deleteNumber();
    } else if (e.key === "Escape") {
        clear();
    } else if (["+", "-", "*", "/"].includes(e.key)) {
        handleOperator(e.key);
    }
});

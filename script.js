const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");
const themeToggle = document.getElementById("themeToggle");

let justCalculated = false;
const MAX_DIGITS = 12;

buttons.forEach(button => {
    button.addEventListener("click", () => handleInput(button.innerText));
});

function handleInput(value) {
    if (value === "C") {
        clearDisplay();
    } 
    else if (value === "⌫") {
        deleteLast();
    } 
    else if (value === "=") {
        calculate();
    } 
    else if (value !== "🌙 Dark" && value !== "☀ Light") {
        appendValue(value);
    }
}

function appendValue(value) {
    const converted = convertOperator(value);

    if (justCalculated && !isNaN(converted)) {
        display.innerText = converted;
        justCalculated = false;
        return;
    }

    const digitCount = display.innerText.replace(/[^0-9]/g, "").length;

    if (!isNaN(converted) && digitCount >= MAX_DIGITS) return;

    if (display.innerText === "0" || display.innerText === "Error") {
        display.innerText = converted;
    } else {
        display.innerText += converted;
    }

    justCalculated = false;
}

function convertOperator(value) {
    if (value === "÷") return "/";
    if (value === "×") return "*";
    if (value === "−") return "-";
    return value;
}

function clearDisplay() {
    display.innerText = "0";
    justCalculated = false;
}

function deleteLast() {
    display.innerText = display.innerText.slice(0, -1) || "0";
}

function calculate() {
    try {
        display.innerText = eval(display.innerText);
        justCalculated = true;
    } catch {
        display.innerText = "Error";
        justCalculated = true;
    }
}

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light");
    themeToggle.innerText = document.body.classList.contains("light")
        ? "☀ Light"
        : "🌙 Dark";
});

let firstOperand = '';
let secondOperand = '';
let currentOperator = null;
let shouldResetScreen = false;

const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');
        const type = button.getAttribute('data-type');

        if (button.id === 'clear') {
            clearDisplay();
        } else if (button.id === 'equals') {
            evaluate();
        } else if (type === 'operator') {
            setOperator(value);
        } else {
            appendNumber(value);
        }

        updateDisplay();
    });
});

function appendNumber(number) {
    if (display.textContent === '0' || shouldResetScreen) {
        display.textContent = number;
        shouldResetScreen = false;
    } else {
        display.textContent += number;
    }
}

function setOperator(operator) {
    if (currentOperator !== null) evaluate();
    firstOperand = display.textContent;
    currentOperator = operator;
    shouldResetScreen = true;
}

function evaluate() {
    if (currentOperator === null || shouldResetScreen) return;
    if (currentOperator === '/' && display.textContent === '0') {
        display.textContent = 'Error';
        clear();
        return;
    }
    secondOperand = display.textContent;
    display.textContent = roundResult(
        operate(currentOperator, firstOperand, secondOperand)
    );
    currentOperator = null;
}

function operate(operator, a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    switch (operator) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            return a / b;
        default:
            return null;
    }
}

function roundResult(number) {
    return Math.round(number * 1000) / 1000;
}

function clear() {
    firstOperand = '';
    secondOperand = '';
    currentOperator = null;
    shouldResetScreen = false;
}

function clearDisplay() {
    display.textContent = '0';
    clear();
}

function updateDisplay() {
    if (display.textContent === 'Error') {
        setTimeout(() => display.textContent = '0', 1000);
    }
}
function appendNumber(number) {
    if (display.textContent === '0' || shouldResetScreen) {
        display.textContent = number;
        shouldResetScreen = false;
    } else if (number === '.' && display.textContent.includes('.')) {
        return;
    } else {
        display.textContent += number;
    }
}
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');
        const type = button.getAttribute('data-type');

        if (button.id === 'clear') {
            clearDisplay();
        } else if (button.id === 'equals') {
            evaluate();
        } else if (button.id === 'backspace') {
            deleteNumber();
        } else if (type === 'operator') {
            setOperator(value);
        } else {
            appendNumber(value);
        }

        updateDisplay();
    });
});

function deleteNumber() {
    if (display.textContent.length > 1) {
        display.textContent = display.textContent.slice(0, -1);
    } else {
        display.textContent = '0';
    }
}
document.addEventListener('keydown', (event) => {
    if (event.key >= 0 && event.key <= 9) appendNumber(event.key);
    if (event.key === '.') appendNumber('.');
    if (event.key === '=' || event.key === 'Enter') evaluate();
    if (event.key === 'Backspace') deleteNumber();
    if (event.key === 'Escape') clearDisplay();
    if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') {
        setOperator(event.key);
    }
    updateDisplay();
});

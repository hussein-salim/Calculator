document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    const display = document.getElementById('display');
    let currentInput = '';
    let operator = '';
    let previousInput = '';

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const value = this.getAttribute('data-value');
            const type = this.getAttribute('data-type');

            if (type === 'operator') {
                if (currentInput !== '') {
                    previousInput = currentInput;
                    currentInput = '';
                }
                operator = value;
            } else if (value === 'C') {
                currentInput = '';
                previousInput = '';
                operator = '';
                display.textContent = '0';
            } else if (value === '=') {
                if (previousInput !== '' && currentInput !== '' && operator !== '') {
                    currentInput = eval(`${previousInput} ${operator} ${currentInput}`);
                    display.textContent = currentInput;
                    previousInput = '';
                    operator = '';
                }
            } else if (value === '←') {
                currentInput = currentInput.slice(0, -1);
                display.textContent = currentInput || '0';
            } else {
                currentInput += value;
                display.textContent = currentInput;
            }
        });
    });
});

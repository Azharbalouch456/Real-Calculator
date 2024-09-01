document.addEventListener('DOMContentLoaded', () => {
    const inputbox = document.getElementById('inputbox');
    let expression = '';

    function updateDisplay() {
        inputbox.value = expression || '0';
    }

    function evaluateExpression() {
        try {
            // Use Function constructor for safer evaluation
            expression = new Function('return ' + expression)().toString();
        } catch (e) {
            expression = 'Error';
        }
        updateDisplay();
    }

    function toggleParentheses() {
        const openCount = (expression.match(/\(/g) || []).length;
        const closeCount = (expression.match(/\)/g) || []).length;

        if (openCount > closeCount) {
            expression += ')';
        } else {
            expression += '(';
        }
        updateDisplay();
    }

    function handleButtonClick(e) {
        const button = e.target;
        const action = button.dataset.action;
        const buttonText = button.innerText;

        if (action) {
            switch (action) {
                case 'equals':
                    evaluateExpression();
                    break;
                case 'clear':
                    expression = '';
                    updateDisplay();
                    break;
                case 'backspace':
                    expression = expression.slice(0, -1);
                    updateDisplay();
                    break;
                case 'parentheses':
                    toggleParentheses();
                    break;
                default:
                    break;
            }
        } else {
            expression += buttonText;
            updateDisplay();
        }
    }

    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', handleButtonClick);
    });
});

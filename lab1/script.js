const num1Input = document.getElementById('num1');
const num2Input = document.getElementById('num2');
const operationSelect = document.getElementById('operation');
const calculateBtn = document.getElementById('calculate-btn');
const historyDiv = document.getElementById('history');

let history = [];

function validateNumber(value, inputElement) {
    if (value.trim() === '') {
        inputElement.classList.add('error');
        return { valid: false, error: 'Пустое поле' };
    }
    
    const number = parseFloat(value.replace(',', '.'));
    if (isNaN(number)) {
        inputElement.classList.add('error');
        return { valid: false, error: 'Не число' };
    }
    
    if (!isFinite(number)) {
        inputElement.classList.add('error');
        return { valid: false, error: 'Слишком большое' };
    }
    
    inputElement.classList.remove('error');
    return { valid: true, value: number };
}

function calculate() {

    num1Input.classList.remove('error');
    num2Input.classList.remove('error');
    historyDiv.innerHTML = '';
    
    const num1Result = validateNumber(num1Input.value, num1Input);
    const num2Result = validateNumber(num2Input.value, num2Input);
    
    if (!num1Result.valid || !num2Result.valid) {
        return;
    }
    
    const num1 = num1Result.value;
    const num2 = num2Result.value;
    const operation = operationSelect.value;
    
    if (operation === '/' && num2 === 0) {
        num2Input.classList.add('error');
        showError('Деление на ноль невозможно');
        return;
    }
    
    let result;
    let opSymbol = operation;
    
    switch (operation) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            result = num1 / num2;
            break;
        default:
            result = 0;
    }
    
    result = Math.round(result * 1000000) / 1000000;
    
    addToHistory(num1, opSymbol, num2, result);
}

function showError(message) {
    const div = document.createElement('div');
    div.className = 'history-item error';
    div.textContent = message;
    historyDiv.appendChild(div);
}

function addToHistory(num1, operation, num2, result) {
    const entry = {
        text: `${num1} ${operation} ${num2} = ${result}`,
        timestamp: Date.now()
    };
    
    history.unshift(entry);
    
    if (history.length > 5) {
        history.pop();
    }
    
    updateHistoryDisplay();
}

function updateHistoryDisplay() {
    historyDiv.innerHTML = '';
    
    history.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'history-item';
        
        if (index === 0) {
            div.classList.add('current');
        } else {
            div.classList.add('old');
        }
        
        div.textContent = item.text;
        historyDiv.appendChild(div);
    });
}

calculateBtn.addEventListener('click', calculate);

num1Input.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') calculate();
});

num2Input.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') calculate();
});

num1Input.addEventListener('input', function() {
    this.classList.remove('error');
    historyDiv.innerHTML = '';
});

num2Input.addEventListener('input', function() {
    this.classList.remove('error');
    historyDiv.innerHTML = '';
});
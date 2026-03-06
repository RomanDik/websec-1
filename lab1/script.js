const num1Input = document.getElementById('num1');
const num2Input = document.getElementById('num2');
const operationSelect = document.getElementById('operation');
const calculateBtn = document.getElementById('calculate-btn');
const historyDiv = document.getElementById('history');

if (!num1Input || !num2Input || !operationSelect || !calculateBtn || !historyDiv) {
    console.error('Не все элементы найдены в HTML');
    throw new Error('Ошибка инициализации: элементы не найдены');
}

let history = [];

function calculate() {
    num1Input.classList.remove('error');
    num2Input.classList.remove('error');
    historyDiv.innerHTML = '';
    
    const num1 = parseFloat(num1Input.value);
    const num2 = parseFloat(num2Input.value);
    
    if (num1Input.value === '' || num2Input.value === '') {
        if (num1Input.value === '') {
            num1Input.classList.add('error');
        }
        if (num2Input.value === '') {
            num2Input.classList.add('error');
        }
        return;
    }
    
    if (operationSelect.value === '/' && num2 === 0) {
        num2Input.classList.add('error');
        showError('Деление на ноль невозможно');
        return;
    }

    let result;
    let opSymbol = operationSelect.value;
    
    switch (operationSelect.value) {
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

    result = parseFloat(result.toFixed(6));

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
        
        div.classList.add(index === 0 ? 'current' : 'old');
        
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
});

num2Input.addEventListener('input', function() {
    this.classList.remove('error');
});
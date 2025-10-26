let expression = "";
let expressionToShow = "";

function addChar(char) {
    if (opCheck(char) && decCheck(char)){
        if (char === '%'){
            expression += '*0.01*';
            expressionToShow += '%';
            document.getElementById("input").value = expressionToShow;
            return
        }
        expression += char;
        expressionToShow += char;
        document.getElementById("input").value = expressionToShow;
    }
}

function opCheck(char){
    const lastChar = expressionToShow[expressionToShow.length -1];
    const operators = ['+', '-', '*', '/', '%', '.', '^'];
    const opAtLast = operators.includes(char) && operators.includes(lastChar)
    const emptyExpr = expression.length === 0 && operators.includes(char);

    return !(opAtLast || emptyExpr)
}

function decCheck(char){
    if (char !== '.') return true

    const ops = ['+', '-', '*', '/', '%', '^'];
    let lastOp = Math.max(...ops.map(op => expressionToShow.lastIndexOf(op)));
    let currentNumber = expressionToShow.slice(lastOp + 1);

    return !(currentNumber.includes('.'))
}

function clearInput(){
    expression = "";
    expressionToShow = "";
    document.getElementById('input').value = expressionToShow;
    
}

function calculateResult(){
    try{
        let result = math.evaluate(expression);
        expression = result.toString();
        expressionToShow = result.toString();
        document.getElementById('input').value = expressionToShow;
    }
    catch{
        expression = '';
        expressionToShow = '';
        document.getElementById('input').value = 'Error';
    }
    
}

function backspace() {
    const inputField = document.getElementById('input');
    let caretPos = inputField.selectionStart;

    if (caretPos === 0) return;

    if (expressionToShow[caretPos - 1] === '%') {
        expression = expression.slice(0, caretPos - 1) + expression.slice(caretPos + 5);
        expressionToShow = expressionToShow.slice(0, caretPos - 1) + expressionToShow.slice(caretPos);
        inputField.value = expressionToShow;
        inputField.setSelectionRange(caretPos - 1, caretPos - 1);
        return;
    }

    expression = expression.slice(0, caretPos - 1) + expression.slice(caretPos);
    expressionToShow = expressionToShow.slice(0, caretPos - 1) + expressionToShow.slice(caretPos);

    inputField.value = expressionToShow;
    inputField.setSelectionRange(caretPos - 1, caretPos - 1);
}


document.addEventListener('keydown', function(event) {
    const key = event.key;

    const inputField = document.getElementById('input');
    let caretPos = inputField.selectionStart;

    if (key >= '0' && key <= '9') {
        addChar(key);
    } 
    else if (key === '+' || key === '-' || key === '*' || key === '/' || key === '^') {
        addChar(key);
    } 
    else if (key === '%') {
        addChar('%');
    }
    else if (key === '.') {
        addChar('.');
    }
    else if (key === 'Enter') {
        calculateResult();
    }
    else if (key === 'Backspace') {
        backspace();
    }
    else if (key === 'Escape') {
        clearInput();
    }

    else if (event.key === 'ArrowLeft') {
        inputField.setSelectionRange(Math.max(caretPos - 1, 0), Math.max(caretPos - 1, 0));
        event.preventDefault();
    }
    else if (event.key === 'ArrowRight') {
        inputField.setSelectionRange(Math.min(caretPos + 1, inputField.value.length),
                                     Math.min(caretPos + 1, inputField.value.length));
    }

    event.preventDefault();
});

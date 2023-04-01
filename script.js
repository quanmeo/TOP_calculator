let input = '';

function sum(num1, num2) {
    return num1 + num2;
}

function substraction(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    if (num2 === 0) {
        console.log('Cannot divide by 0');
        return undefined;
    } else {
        return num1 / num2;
    }
}


function operation(operator, num1, num2) {
    let ret = 0;
    switch (operator) {
        case '+':
            ret = sum(num1, num2);
            break;
        case '-':
            ret = substraction(num1, num2);
            break;
        case 'x':
            ret = multiply(num1, num2);
            break;
        case ':':
            ret = divide(num1, num2);
            break;
        default:
            ret = undefined;
            break;
    }

    return ret;
}

function setExpression() {
    const expression = document.querySelector('#expression');
    if (!expression) return;

    expression.innerHTML = input;
}

function setResult(value) {
    const result = document.querySelector('#result');
    if (!result) return;

    result.innerHTML = value;
}

function resetResult() {
    setResult('0');
}

function extractExpress(str) {
    const opes = /[\+\-x\:]/;
    let firstIdx = str.search(opes);
    if (firstIdx === -1) {
        return parseFloat(str.trim());
    }

    let nextIdx = str.substring(firstIdx + 1).search(opes);
    if (nextIdx !== -1) nextIdx += firstIdx + 1;

    while (firstIdx !== -1 && nextIdx !== -1) {
        const firstHalf = parseFloat(str.substring(0, firstIdx).trim());
        const secondHalf = parseFloat(str.substring(firstIdx + 1, nextIdx).trim());
        const ope = str.at(firstIdx);

        const value = operation(ope, firstHalf, secondHalf);
        
        str = `${value}` + str.substring(nextIdx);

        firstIdx = str.search(opes);
        nextIdx = str.substring(firstIdx + 1).search(opes);
        if (nextIdx !== -1) nextIdx += firstIdx + 1;
    }

    const firstHalf = parseFloat(str.substring(0, firstIdx).trim());
    const secondHalf = parseFloat(str.substring(firstIdx + 1).trim());
    const ope = str.at(firstIdx);

    const value = operation(ope, firstHalf, secondHalf);

    return value;
}

function calculate() {
    let trimInput = input.trim();

    if (trimInput.at(trimInput.length - 1).search(/[\+\-x\:]/) !== -1) {
        return 'Invalid input';
    }
    let firstCloseParen = trimInput.indexOf(')');
    while (firstCloseParen !== -1) {
        let lastOpenParen = trimInput.lastIndexOf('(', firstCloseParen);
        if (lastOpenParen === -1) {
            return 'Invalid input';
        }
        const sub = trimInput.substring(lastOpenParen + 1, firstCloseParen);
        const val = extractExpress(sub);

        trimInput = trimInput.substring(0, lastOpenParen) + val + trimInput.substring(firstCloseParen + 1);

        firstCloseParen = trimInput.indexOf(')');
    }

    if (trimInput.search(/[()]/) !== -1) return 'Invalid input';

    return extractExpress(trimInput);
}

function calculateResult() {
    setResult(calculate());
}

function updateResult() {
    setExpression();
}

function deleteAll() {
    input = '';
    setExpression();
    resetResult();
}

function clearACharacter() {
    if (input.length === 0) {
        return;
    }

    input = input.substring(0, input.length - 1);
    setExpression();
}

function addCharacter(id) {
    input = input + id;
    setExpression();
}

function addOperator(id) {
    if (input.length === 0) {
        return; // do nothing
    }
    const opes = /[\+\-x\:]/;

    if (input.at(input.length - 1).search(opes) !== -1) {
        return; // do nothing
    }

    addCharacter(id);
}

function addDotOperator() {
    if (input.length === 0) {
        input = input + '0';
    }

    addCharacter('.');
}

function clickBtn(e) {
    const id = this.getAttribute('id');
    const value = this.innerHTML;

    if (!id) return;
    switch(id) {
        case 'delete':
            deleteAll();
            break;
        case 'clear':
            clearACharacter();
            break;
        case ':':
        case 'x':
        case '-':
        case '+':
            addOperator(id);
            break;
        case 'dot':
            addDotOperator();
            break;
        case '=':
            calculateResult();
            break;
        case 'open-paren':
        case 'close-paren':
        case '7':
        case '8':
        case '9':
        case '4':
        case '5':
        case '6':
        case '1':
        case '2':
        case '3':
        case '0':
            addCharacter(value);
            break;
        default:
            console.log('Other');
            break;
    };
}

function text(e) {
    this.style.backgroundColor = 'pink';
}

function text2(e) {
    this.style.backgroundColor = null;
}

function addEvent() {
    const container = document.querySelector('.container');
    if (!container) {
        return;
    }

    const btns = container.childNodes;

    btns.forEach((btn) => btn.addEventListener('click', clickBtn));
    btns.forEach((btn) => btn.addEventListener('mouseover', text));
    btns.forEach((btn) => btn.addEventListener('mouseleave', text2));
}

function game() {
    addEvent();
}

game();
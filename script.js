const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

class Calculator{
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.previousOperand = '';
        this.currentOperand = '';
        this.operation = undefined;
    }
    
    clear(){
        this.currentOperand = '';
        this.operation = undefined;
        this.updateDisplay();
    }
    
    appendNumber(number){
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand+= number;
        this.updateDisplay();
    }
    
    chooseOperation(operation){
        if (!this.currentOperand) return;
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
        this.updateDisplay();
    }
    
    compute(){
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        let result;
        
        if (this.operation === '+'){
            result = prev + current;
        } else if (this.operation === '-'){
            result = prev - current;
        } else if (this.operation === '*'){
            result = prev * current;
        } else if (this.operation === '/'){
            result = prev / current;
        }
        
        this.currentOperand = result.toString();
        this.operation = undefined;
        this.previousOperandTextElement.innerText = '';
        this.currentOperandTextElement.innerText = result;
    }
    
    updateDisplay(){
        this.currentOperandTextElement.innerText = this.currentOperand;

        // Show previous operand and the selected operation
        if (this.operation != null){
            this.previousOperandTextElement.innerText =
                `${this.previousOperand} ${this.operation}`;
        } else {
            // Clear the previous operand display when no operation is active
            this.previousOperandTextElement.innerText = '';
        }
    }
    
    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
        this.updateDisplay();
    }
}

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
       calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

equalsButton.addEventListener('click', () => {
       calculator.compute();
});

deleteButton.addEventListener('click', () => {
       calculator.delete();
});

allClearButton.addEventListener('click', () => {
       calculator.clear();
});

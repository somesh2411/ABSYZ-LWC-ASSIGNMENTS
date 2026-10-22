import { LightningElement } from 'lwc';

export default class SimpleCalculator extends LightningElement {
    firstNumber = '';
    secondNumber = '';
    historyList = [];
    errorMessage = '';

    handleInputChange(event) {
        const field = event.target.dataset.field;
        if (field === 'first') {
            this.firstNumber = event.target.value;
        } else if (field === 'second') {
            this.secondNumber = event.target.value;
        }
        this.errorMessage = '';
    }

    handleCalculate(event) {
        const operator = event.target.dataset.op;

        if (this.firstNumber === '' || this.secondNumber === '') {
            this.errorMessage = 'Please enter both numbers before calculating.';
            return;
        }

        const num1 = parseFloat(this.firstNumber);
        const num2 = parseFloat(this.secondNumber);

        if (isNaN(num1) || isNaN(num2)) {
            this.errorMessage = 'Please enter valid numerical values.';
            return;
        }

        let result;
        if (operator === '+') {
            result = num1 + num2;
        } else if (operator === '-') {
            result = num1 - num2;
        } else if (operator === '*') {
            result = num1 * num2;
        } else if (operator === '/') {
            if (num2 === 0) {
                this.errorMessage = 'Cannot divide by zero.';
                return;
            }
            result = num1 / num2;
        }
        const formattedResult = Number.isInteger(result) ? result : parseFloat(result.toFixed(4));
        const message = `Result of ${num1} ${operator} ${num2} is ${formattedResult}`;
        this.historyList = [
            {
                id: Date.now() + Math.random(),
                displayText: message
            },
            ...this.historyList
        ];

        this.errorMessage = '';
    }

    handleClearHistory() {
        this.historyList = [];
        this.errorMessage = '';
    }

    get hasHistory() {
        return this.historyList.length > 0;
    }
}
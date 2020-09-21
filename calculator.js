class Calculator {
    constructor(previousNumTextElement, currentNumTextElement) {
        this.previousNumTextElement = previousNumTextElement
        this.currentNumTextElement = currentNumTextElement
        this.clear()
    }

    clear(){
        this.currentNum = ''
        this.previousNum = ''
        this.operation = undefined
    }

    delete(){
        this.currentNum = this.currentNum.toString().slice(0, -1)
    }
    
    appendNumber(number){
        // ensures user doesn't type multiple periods
        if(number === '.' && this.currentNum.includes('.')) 
            return
            this.currentNum = this.currentNum.toString() + number.toString()
    }
    
    chooseOperator(operation){
        if(this.currentNum === '') return
        if(this.previousNum !== ''){
            this.compute()
        }
        this.operation = operation
        this.previousNum = this.currentNum
        this.currentNum = ''
    }

    compute(){
        let computation
        const prev = parseFloat(this.previousNum)
        const current = parseFloat(this.currentNum)
        if(isNaN(prev) || isNaN(current)) return
        switch(this.operation){
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            case '%':
                computation = (prev/100) * current
                break
            case '+/-':
                computation = prev * -1 || current * 1
                break
            default:
                return
        }
        this.currentNum = computation
        this.operation = undefined
        this.previousNum = ''
    }

    getDisplayNum(number){
        const stringNum = number.toString()
        const integerNum = parseFloat(stringNum.split('.')[0])
        const decimalNum = stringNum.split('.')[1]
        let integerNumShow 
        if(isNaN(integerNum)) {
            integerNumShow = ''
        } else{
            integerNumShow = integerNum.toLocaleString('en', {maximumFractionDigits: 0})
        } if (decimalNum != null) {
            return `${integerNumShow}.${decimalNum}`
        } else {
            return integerNumShow
        }
    }

    updateDisplay(){
        this.currentNumTextElement.innerText = 
            this.getDisplayNum(this.currentNum)
        if(this.operation != null){
            this.previousNumTextElement.innerText = `${this.previousNum} ${this.operation}`
        } else {
            this.previousNumTextElement.innerText = ''
        }
    }
}


// calculator variables
const numBtns = document.querySelectorAll('[data-number]');
const operatorBtns = document.querySelectorAll('[data-operator]');
const equalBtn = document.querySelector('[data-equals]');
const delBtn = document.querySelector('[data-delete]')
const clearBtn = document.querySelector('[data-all-clear]');
const previousNumTextElement = document.querySelector('[data-previous]');
const currentNumTextElement = document.querySelector('[data-current]');

const calculator = new Calculator(previousNumTextElement, currentNumTextElement)

numBtns.forEach(button =>{
    button.addEventListener('click', ()=>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
});

operatorBtns.forEach(button =>{
    button.addEventListener('click', ()=>{
        calculator.chooseOperator(button.innerText)
        calculator.updateDisplay()
    })
});

equalBtn.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
});

clearBtn.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
});

delBtn.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
});
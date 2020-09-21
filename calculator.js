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
    delete(){}
    appendNumber(number){
        if(number === '.' && this.currentNum.includes('.')) 
            return
            this.currentNum = this.currentNum.toString() + number.toString()
    }
    chooseOperator(){}
    compute(){}
    updateDisplay(){
        this.currentNumTextElement.innerText = this.currentNum
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
})
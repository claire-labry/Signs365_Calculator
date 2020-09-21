// calculator constructor
// this allows the previousNum and currentNum to change
class Calculator {
    constructor(previousNumTextElement, currentNumTextElement) {
        this.previousNumTextElement = previousNumTextElement
        this.currentNumTextElement = currentNumTextElement
        this.clear()
    }
    //  function: clears the output
    clear(){
        this.currentNum = ""
        this.previousNum = ""
        this.operation = undefined
    }
    // function: deletes the number on the left by one
    delete(){
        this.currentNum = this.currentNum.toString().slice(0, -1)
    }
    // function: allows numbers to appear next to each other
    appendNum(number){
        // ensures user doesn't type multiple periods
        if(number === "." && this.currentNum.includes(".")) 
            return
            this.currentNum = this.currentNum.toString() + number.toString()
    }
    // function: allows user to pick the operation on the current & previous number
    chooseOperator(operation){
        if(this.currentNum === "") return
        if(this.previousNum !== ""){
            this.compute()
        }
        this.operation = operation
        this.previousNum = this.currentNum
        this.currentNum = ""
    }
    // function: a switch statement that allows each operator to do the actual computation
    compute(){
        let computation
        const prev = parseFloat(this.previousNum)
        const current = parseFloat(this.currentNum)
        if(isNaN(prev) || isNaN(current)) return
        switch(this.operation){
            case "+":
                computation = prev + current
                break
            case "-":
                computation = prev - current
                break
            case "*":
                computation = prev * current
                break
            case "÷":
                computation = prev / current
                break
            case "%":
                computation = (prev/100) * current
                break
            // pseudocode for case "+/-"":
            //     bring in computation variable
            //     have current variable become negative 
            //     number becomes negative/positive in output
            //     operator is chosen and applied to whether negative/positive 
            //     output is negative or positive based on +/- chosen 
            default:
                return
        }
        this.currentNum = computation
        this.operation = undefined
        this.previousNum = ''
    }
    // function: allows number to be displayed in the output in string format, allows numbers to have a integer and decimal
    getDisplayNum(number){
        const stringNum = number.toString()
        const integerNum = parseFloat(stringNum.split('.')[0])
        const decimalNum = stringNum.split('.')[1]
        let integerNumShow 
        if(isNaN(integerNum)) {
            integerNumShow = ''
        } else{
            integerNumShow = integerNum.toLocaleString("en", {maximumFractionDigits: 0})
        } if (decimalNum != null) {
            return `${integerNumShow}.${decimalNum}`
        } else {
            return integerNumShow
        }
    }
    // function: updates the outputs display based on the chosen calculation
    updateDisplay(){
        this.currentNumTextElement.innerText = 
            this.getDisplayNum(this.currentNum)
        if(this.operation != null){
            this.previousNumTextElement.innerText = `${this.previousNum} ${this.operation}`
        } else {
            this.previousNumTextElement.innerText = ""
        }
    }
}

// calculator variables
const numBtns = document.querySelectorAll("[data-number]");
const operatorBtns = document.querySelectorAll("[data-operator]");
const equalBtn = document.querySelector("[data-equals]");
const delBtn = document.querySelector("[data-delete]")
const clearBtn = document.querySelector("[data-all-clear]");
const previousNumTextElement = document.querySelector("[data-previous]");
const currentNumTextElement = document.querySelector("[data-current]");

const calculator = new Calculator(previousNumTextElement, currentNumTextElement)

// numsBtns method: allows user to click on buttons and have them be appended/updated
numBtns.forEach(button =>{
    button.addEventListener("click", ()=>{
        calculator.appendNum(button.innerText)
        calculator.updateDisplay()
    })
});
// operatorBtns method: allows user to click operator of choice & and output updated
operatorBtns.forEach(button =>{
    button.addEventListener("click", ()=>{
        calculator.chooseOperator(button.innerText)
        calculator.updateDisplay()
    })
});
// equalBtn method: allows user to click the equal button and the compute function is fired and output is displayed
equalBtn.addEventListener("click", button => {
    calculator.compute()
    calculator.updateDisplay()
});
// clearBtn method: allows user to clear the output and display is blank
clearBtn.addEventListener("click", button => {
    calculator.clear()
    calculator.updateDisplay()
});
// delBtn method: allows user to click the del button to delete a number and update the output
delBtn.addEventListener("click", button => {
    calculator.delete()
    calculator.updateDisplay()
});
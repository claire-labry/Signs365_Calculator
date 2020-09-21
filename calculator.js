class Calculator {
    constructor(historyTextElement, currentTextElement){
        this.historyTextElement = historyTextElement
        this.currentTextElement = currentTextElement
    }
}

const numBtn = document.querySelectorAll('[data-number]');
const operatorBtn = document.querySelectorAll('[data-operator]');
const equalBtn = document.querySelector('[data-equals]');
const delBtn = document.querySelector('[data-del]')
const clearBtn = document.querySelector('[data-clear]');
const historyTextElement = document.querySelector('[data-history]');
const currentTextElement = document.querySelector('[data-current]');
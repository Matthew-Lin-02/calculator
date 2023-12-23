
const calculator = new Calculator();
const digitButtons = document.querySelectorAll('.digit');
const displayText = document.querySelector('.display-text');
const operatorButtons = document.querySelectorAll('.operator');
const equalsButton = document.querySelector('#equals');
const clearButton = document.querySelector('#clear');
const reverseSignButton = document.querySelector('#reverse-sign');
const percentageButton = document.querySelector('#percentage');
const decimalButton =document.querySelector('#decimal');
const buttons = document.querySelectorAll('.calculator-button');

let number1 = 0;
let number2 = null;
let globalOperator = '';
let newNumber = true;

window.addEventListener("keyup", (event) => {
    const keyName = event.key;
    if(keyName === "Backspace") clear();
    buttons.forEach((button) =>{
   
        if(button.textContent === keyName){
            button.click();
        } 
    });
    },
    false,
);
function Calculator(){
    this.methods = {
        "+" : (a,b) => a + b,
        "-" : (a,b) => a - b,
        "x" : (a,b) => a * b,
        "/" : (a,b) => {
            if(b === 0){
                return "Lmao"
            }
            return a / b;
        },
    }

    this.operate = function(a,b,operator){
 
        if(a=== null || b == null){
            return -1;
        }
        if(operator === ''){

            return -1;
        }
        a = Number(a);
        b = Number(b);
        
        updateDisplay(roundAccurately(this.methods[operator](a,b),15));
        updateNumbers()
        number2 = null;
    }
}

function updateNumbers(){
    number2 = number1;
    number1 = displayText.textContent;
}

function handleDigitButtonClick(){
    removeSelection();
    if(displayText.textContent === '0'){
     
        updateDisplay(this.textContent);
        // number1 = displayText.textContent;
        updateNumbers();
        newNumber = false;
        return -1;
    }

    if(newNumber === true){
        updateDisplay(this.textContent);
        updateNumbers();
        newNumber = false;
    }else{
        updateDisplay(displayText.textContent + this.textContent); 
        number1 = displayText.textContent;

    }
}

function handleEqualsButtonClick(){
    removeSelection();
    if(globalOperator === ''){
        return -1;
    }
    calculator.operate(number2,number1,globalOperator);  
    newNumber = true;
    number2 = null;
    globalOperator = '';
}
function addDigitButtonEventListeners(){
    digitButtons.forEach((button) => {
        button.addEventListener('click', handleDigitButtonClick);
    });
}

function removeSelection(){
    operatorButtons.forEach((button)=>{
        button.removeAttribute('id');
    });
}
function addOperatorButtonEventListeners(){
    operatorButtons.forEach((button) => {
        button.addEventListener('click', ()=>{
            removeSelection();
            button.setAttribute('id','selected-operator');

            calculator.operate(number2,number1,globalOperator)
            globalOperator = button.textContent;
            newNumber = true;
            
        })
    })
}

function clear(){
    removeSelection();
    updateDisplay('0');
    number1 = 0;
    number2 = null;
    newNumber = true;
    globalOperator = '';
}

function reverseSign(){
    number1 = (-1 * number1).toString();
    updateDisplay(number1)
}

function percentage(){
    number1 = (0.01 * number1).toString();
    updateDisplay(number1)
}

function decimal(){
    removeSelection();
    if(displayText.textContent.includes(this.textContent) && !newNumber){
        return -1;
    }

    if(newNumber === true){
        updateDisplay('0' + this.textContent); 
        updateNumbers();
        newNumber = false;
    }else{
        updateDisplay(displayText.textContent + this.textContent); 
        number1 = displayText.textContent;

    }
}

function updateDisplay(displayValue){

    displayValue = displayValue.toString();
    if(displayValue === "0"){
        clearButton.textContent = "AC";
    }else{
        clearButton.textContent = "C";
    }
    
    if(displayValue.length > 8) {
        displayText.textContent = displayValue.substring(0, 8);
    }else{
        displayText.textContent = displayValue;
    }
}

function addMouseOutClass(){
    // if(this.classList.contains('mouseout')){
    //     this.classList.remove('mouseout');
    // }
    // this.classList.add('mouseout');
    this.classList.add('mouseout');
    
    const listener = this.addEventListener('animationend', function(){
        this.classList.remove('mouseout');
        this.removeEventListener('animationend', listener);
    });

}

function roundAccurately(num, places) {
    return parseFloat(Math.round(num + 'e' + places) + 'e-' + places);
}

function addCalculatorEventListeners(){
    addDigitButtonEventListeners();
    addOperatorButtonEventListeners();
    equalsButton.addEventListener('click', handleEqualsButtonClick);
    clearButton.addEventListener('click', clear)
    reverseSignButton.addEventListener('click', reverseSign);
    percentageButton.addEventListener('click', percentage);
    decimalButton.addEventListener('click', decimal);
    buttons.forEach((button) =>{
        button.addEventListener('mouseout', addMouseOutClass);
        button.addEventListener('mouseover', function(){
            this.classList.remove('mouseout');
        })
    })
}

addCalculatorEventListeners();

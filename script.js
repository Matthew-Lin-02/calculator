function Calculator(){
    this.methods = {
        "+" : (a,b) => a + b,
        "-" : (a,b) => a - b,
        "*" : (a,b) => a * b,
        "/" : (a,b) => a / b,
    }

    this.operate = function(a,b,operator){
        return this.methods[operator](a,b);
    }
}

const calculator = new Calculator();
console.log(calculator.operate(3,5,'+'));
console.log(calculator.operate(3,5,'-'));
console.log(calculator.oeprate(3,5,'*'));
console.log(calculator.operate(1,3,'/'));

let number1;
let number2;
let operator;
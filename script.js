const calculatorDisplay = document.querySelector(".display");

const calculator = {
  display: "",
  solution: null,
  number1: null,
  operator: null,
  number2: null,
  
  add() {
    this.solution = this.number1 + this.number2; 
  },
  subtract() {
    this.solution = this.number1 - this.number2;
  },
  multiply() {
    this.solution = this.number1 * this.number2;
  },
  divide() {
    this.solution = this.number1 / this.number2;
  },
  updateDisplay() {
    calculatorDisplay.textContent = this.display;
  },
  clearDisplay() {
    this.display = "";
    this.updateDisplay();
  },
  clearCalculator() {
    this.display = "";
    this.number1 = null;
    this.operator = null;
    this.number2 = null;
    this.updateDisplay();
  },
  calculate() {
    switch (this.operator) {
      case "+":
        this.add();
        break;
      case "-":
        this.subtract();
        break;
      case "×":
        this.multiply();
        break;
      case "÷":
        this.divide();
        break;
    }
    this.clearCalculator()
    this.display = this.solution;
    this.updateDisplay();
  }
}

const clearButton = document.querySelector(".clear");
clearButton.addEventListener("click", () => {
  calculator.clearCalculator();
});

const numberButtons = document.querySelectorAll(".number");
numberButtons.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    calculator.display += event.target.textContent;
    calculator.updateDisplay();
  });
});

const operatorButtons = document.querySelectorAll(".operator");
operatorButtons.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    if (calculator.display === "") return;
    calculator.number1 = +calculator.display;
    calculator.operator = event.target.textContent;
    calculator.clearDisplay();
  });
});

const equalButton = document.querySelector(".equal");
equalButton.addEventListener("click", () => {
  if (calculator.display === "" || calculator.operator === null) return;
  calculator.number2 = +calculator.display;
  calculator.calculate();
});
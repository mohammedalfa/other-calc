const currentDisplay = document.querySelector(".current");
const calclationDisplay = document.querySelector(".calculation");

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
    currentDisplay.textContent = this.display;
    calclationDisplay.textContent = `${this.number1 !== null ? this.number1 : ''} \
    ${this.operator !== null ? this.operator : ''} ${this.number2 !== null ? this.number2 : ''}`;
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
    this.solution = null;
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
    this.clearDisplay()
    this.display = this.solution.toString();
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
    if (calculator.number1 !== null && calculator.operator !== null && calculator.display.length > 0) {
      if (calculator.number2 !== null) {
        calculator.number1 = +calculator.display;
        calculator.number2 = null;
        calculator.operator = event.target.textContent;
        calculator.clearDisplay();
      } else {
        calculator.number2 = +calculator.display;
        calculator.calculate();
        calculator.number1 = calculator.solution;
        calculator.solution = null;
        calculator.operator = event.target.textContent;
        calculator.number2 = null;
        calculator.clearDisplay();
      }
    } else {
      calculator.number1 = +calculator.display;
      calculator.operator = event.target.textContent;
      calculator.clearDisplay();
    }
  });
});

const negativeButton = document.querySelector(".negative");
negativeButton.addEventListener("click", () => {
  if (calculator.display.startsWith("-")) {
    calculator.display = calculator.display.slice(1);
  } else {
    calculator.display = "-" + calculator.display;
  }
  calculator.updateDisplay();
});

const equalButton = document.querySelector(".equal");
equalButton.addEventListener("click", () => {
  if (calculator.display === "" || calculator.operator === null) return;
  calculator.number2 = +calculator.display;
  calculator.calculate();
});

const deleteButton = document.querySelector(".delete");
deleteButton.addEventListener("click", () => {
  if (calculator.display.length < 1) return;
  calculator.display = calculator.display.slice(0, -1);
  calculator.updateDisplay();
});

const decimalButton = document.querySelector(".decimal");
decimalButton.addEventListener("click", () => {
  if (calculator.display.includes(".")) return;
  calculator.display += ".";
  calculator.updateDisplay();
})
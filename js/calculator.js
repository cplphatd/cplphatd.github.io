/**
 * Created by David on 11/16/16.
 */
"use strict";
(function () {

    //Global variables
    var btnOne = document.getElementById("btnOne");
    var btnTwo = document.getElementById("btnTwo");
    var btnThree = document.getElementById("btnThree");
    var btnFour = document.getElementById("btnFour");
    var btnFive = document.getElementById("btnFive");
    var btnSix = document.getElementById("btnSix");
    var btnSeven = document.getElementById("btnSeven");
    var btnEight = document.getElementById("btnEight");
    var btnNine = document.getElementById("btnNine");
    var btnZero = document.getElementById("btnZero");
    var btnPlus = document.getElementById("btnPlus");
    var btnMinus = document.getElementById("btnMinus");
    var btnMultiply = document.getElementById("btnMultiply");
    var btnDivide = document.getElementById("btnDivide");
    var btnClear = document.getElementById("btnClear");
    var btnEquals = document.getElementById("btnEquals");
    var btnDecimal = document.getElementById("btnDecimal");
    var btnSquare = document.getElementById("btnSquare");
    var btnSqRoot = document.getElementById("btnSqRoot");
    var btnPosNeg = document.getElementById("btnPosNeg");
    var operatorDisplay = document.getElementById("operator");
    var displayedLeftOperand = document.getElementById("leftOperand");              //The actual left operand element
    var displayedLeftOperandValue = displayedLeftOperand.getAttribute("value");     //The value of the left operand element
    var leftOperandValueForMath = 0;                                                //Value of left operand converted to num for math
    var displayedRightOperand = document.getElementById("rightOperand");            //The actual right operand element
    var displayedRightOperandValue = 0;                                             //The value of the right operand element
    var rightOperandValueForMath = 0;                                               //Value of right operand converted to num for math
    var operator;
    var operatorCounter = 0;                                                        //This value tracks the number of operator button presses before clearing or pressing equals
    var decimalPressCounter = 0;
    var total;
    var msg = document.getElementById("msg");

    //Converts operands to strings
    var convertOperandToString = function (operandNumber) {
        return operandNumber.toString();
    };

    //Converts operands to numbers
    var convertOperandToNumber = function (operandString) {
        return parseFloat(operandString);
    };

    //Takes the value of the number buttons pressed for the left operand and updates display
    var leftOperandBtnPress = function () {
        if (displayedLeftOperandValue != "0") {
            displayedLeftOperand.setAttribute("value", displayedLeftOperandValue + this.innerHTML);
            displayedLeftOperandValue = displayedLeftOperand.getAttribute("value");
            displayedLeftOperandValue = convertOperandToString(displayedLeftOperandValue);
            leftOperandValueForMath = convertOperandToNumber(displayedLeftOperandValue);
        } else {
            displayedLeftOperand.setAttribute("value", this.innerHTML);
            displayedLeftOperandValue = displayedLeftOperand.getAttribute("value");
            displayedLeftOperandValue = convertOperandToString(displayedLeftOperandValue);
            leftOperandValueForMath = convertOperandToNumber(displayedLeftOperandValue);
        }
    };

    //Takes the value of the number button for the right operand and updates display
    var rightOperandBtnPress = function () {
        if (displayedRightOperandValue != "0") {
            displayedRightOperand.setAttribute("value", displayedRightOperandValue + this.innerHTML);
            displayedRightOperandValue = displayedRightOperand.getAttribute("value");
            displayedRightOperandValue = convertOperandToString(displayedRightOperandValue);
            rightOperandValueForMath = convertOperandToNumber(displayedRightOperandValue);
        } else {
            displayedRightOperand.setAttribute("value", this.innerHTML);
            displayedRightOperandValue = displayedRightOperand.getAttribute("value");
            displayedRightOperandValue = convertOperandToString(displayedRightOperandValue);
            rightOperandValueForMath = convertOperandToNumber(displayedRightOperandValue);
        }
    };

    //Immediately calculates result without right operand for sq, sqrt, or negate
    var handleSpecialOperator = function (specialOperator) {

        if (specialOperator == "sq" || specialOperator == "sqrt" || specialOperator == "+/-") {
            calculate();
            decimalPressCounter = 0;
        } else {
            enterRightOperand();
            decimalPressCounter = 0;
        }
    };

    //Takes the value of the operator button pressed and updates display
    var operatorBtnPress = function () {
        if (operatorCounter == 0) {
            operatorCounter += 1;
            calculate();
            operator = this.innerHTML.toString();
            operatorDisplay.setAttribute("value", this.innerHTML);
            decimalPressCounter = 0;
            handleSpecialOperator(operator);
        } else {
            operator = this.innerHTML.toString();
            operatorDisplay.setAttribute("value", this.innerHTML);
            calculate();
            decimalPressCounter = 0;
            handleSpecialOperator(operator);
        }
    };

    //Handles decimal button presses for the left operand
    var leftDecimalBtnPress = function () {
        if (decimalPressCounter < 1) {
            displayedLeftOperand.setAttribute("value", displayedLeftOperandValue + this.innerHTML);
            displayedLeftOperandValue = displayedLeftOperand.getAttribute("value");
            displayedLeftOperandValue = convertOperandToString(displayedLeftOperandValue);
            leftOperandValueForMath = convertOperandToNumber(displayedLeftOperandValue);
            decimalPressCounter += 1;
        } else {
            btnDecimal.removeEventListener("click", leftOperandBtnPress);
        }
    };

    //Handles decimal button presses for the right operand
    var rightDecimalBtnPress = function () {
        if (decimalPressCounter < 1) {
            displayedRightOperand.setAttribute("value", displayedRightOperandValue + this.innerHTML);
            displayedRightOperandValue = displayedRightOperand.getAttribute("value");
            displayedRightOperandValue = convertOperandToString(displayedRightOperandValue);
            rightOperandValueForMath = convertOperandToNumber(displayedRightOperandValue);
            decimalPressCounter += 1;
        } else {
            btnDecimal.removeEventListener("click", rightOperandBtnPress);
        }
    };

    //Handles negation for the left operand
    var negateLeftOperand = function () {
        total = leftOperandValueForMath * -1;
        displayedLeftOperandValue = total;
        leftOperandValueForMath = total;
        displayedLeftOperand.setAttribute("value", displayedLeftOperandValue);
    };

    //Handles negation for the right operand
    var negateRightOperand = function () {
        total = rightOperandValueForMath * -1;
        displayedRightOperandValue = total;
        rightOperandValueForMath = total;
        displayedRightOperand.setAttribute("value", displayedRightOperandValue);
    };

    //Sets event listeners for entering the left operand and removes right operand event listeners
    var enterLeftOperand = function () {
        btnOne.addEventListener("click", leftOperandBtnPress);
        btnTwo.addEventListener("click", leftOperandBtnPress);
        btnThree.addEventListener("click", leftOperandBtnPress);
        btnFour.addEventListener("click", leftOperandBtnPress);
        btnFive.addEventListener("click", leftOperandBtnPress);
        btnSix.addEventListener("click", leftOperandBtnPress);
        btnSeven.addEventListener("click", leftOperandBtnPress);
        btnEight.addEventListener("click", leftOperandBtnPress);
        btnNine.addEventListener("click", leftOperandBtnPress);
        btnZero.addEventListener("click", leftOperandBtnPress);
        btnDecimal.addEventListener("click", leftDecimalBtnPress);
        btnPlus.addEventListener("click", operatorBtnPress);
        btnMinus.addEventListener("click", operatorBtnPress);
        btnMultiply.addEventListener("click", operatorBtnPress);
        btnDivide.addEventListener("click", operatorBtnPress);
        btnSquare.addEventListener("click", operatorBtnPress);
        btnSqRoot.addEventListener("click", operatorBtnPress);
        btnPosNeg.addEventListener("click", negateLeftOperand);
        btnOne.removeEventListener("click", rightOperandBtnPress);
        btnTwo.removeEventListener("click", rightOperandBtnPress);
        btnThree.removeEventListener("click", rightOperandBtnPress);
        btnFour.removeEventListener("click", rightOperandBtnPress);
        btnFive.removeEventListener("click", rightOperandBtnPress);
        btnSix.removeEventListener("click", rightOperandBtnPress);
        btnSeven.removeEventListener("click", rightOperandBtnPress);
        btnEight.removeEventListener("click", rightOperandBtnPress);
        btnNine.removeEventListener("click", rightOperandBtnPress);
        btnZero.removeEventListener("click", rightOperandBtnPress);
        btnDecimal.removeEventListener("click", rightDecimalBtnPress);
        btnPosNeg.removeEventListener("click", negateRightOperand);
        btnClear.addEventListener("click", pressClear);
    };

    //Sets up event listeners for the right operand and removes left operand event listeners
    var enterRightOperand = function () {
        if(operator != "") {
            displayedLeftOperand.setAttribute("value", displayedLeftOperandValue);
            displayedRightOperand.setAttribute("value", "");
            displayedRightOperandValue = 0;
            btnOne.removeEventListener("click", leftOperandBtnPress);
            btnTwo.removeEventListener("click", leftOperandBtnPress);
            btnThree.removeEventListener("click", leftOperandBtnPress);
            btnFour.removeEventListener("click", leftOperandBtnPress);
            btnFive.removeEventListener("click", leftOperandBtnPress);
            btnSix.removeEventListener("click", leftOperandBtnPress);
            btnSeven.removeEventListener("click", leftOperandBtnPress);
            btnEight.removeEventListener("click", leftOperandBtnPress);
            btnNine.removeEventListener("click", leftOperandBtnPress);
            btnZero.removeEventListener("click", leftOperandBtnPress);
            btnDecimal.removeEventListener("click", leftDecimalBtnPress);
            btnPosNeg.removeEventListener("click", negateLeftOperand);
            btnOne.addEventListener("click", rightOperandBtnPress);
            btnTwo.addEventListener("click", rightOperandBtnPress);
            btnThree.addEventListener("click", rightOperandBtnPress);
            btnFour.addEventListener("click", rightOperandBtnPress);
            btnFive.addEventListener("click", rightOperandBtnPress);
            btnSix.addEventListener("click", rightOperandBtnPress);
            btnSeven.addEventListener("click", rightOperandBtnPress);
            btnEight.addEventListener("click", rightOperandBtnPress);
            btnNine.addEventListener("click", rightOperandBtnPress);
            btnZero.addEventListener("click", rightOperandBtnPress);
            btnDecimal.addEventListener("click", rightDecimalBtnPress);
            btnPosNeg.addEventListener("click", negateRightOperand);
            btnEquals.addEventListener("click", pressEquals);
        }
    };

    //Handles the case if user divides by zero
    var dividedByZero = function () {
        $("#msg").removeClass("invisible");
        btnOne.removeEventListener("click", rightOperandBtnPress);
        btnTwo.removeEventListener("click", rightOperandBtnPress);
        btnThree.removeEventListener("click", rightOperandBtnPress);
        btnFour.removeEventListener("click", rightOperandBtnPress);
        btnFive.removeEventListener("click", rightOperandBtnPress);
        btnSix.removeEventListener("click", rightOperandBtnPress);
        btnSeven.removeEventListener("click", rightOperandBtnPress);
        btnEight.removeEventListener("click", rightOperandBtnPress);
        btnNine.removeEventListener("click", rightOperandBtnPress);
        btnZero.removeEventListener("click", rightOperandBtnPress);
        btnDecimal.removeEventListener("click", rightOperandBtnPress);
        btnOne.removeEventListener("click", leftOperandBtnPress);
        btnTwo.removeEventListener("click", leftOperandBtnPress);
        btnThree.removeEventListener("click", leftOperandBtnPress);
        btnFour.removeEventListener("click", leftOperandBtnPress);
        btnFive.removeEventListener("click", leftOperandBtnPress);
        btnSix.removeEventListener("click", leftOperandBtnPress);
        btnSeven.removeEventListener("click", leftOperandBtnPress);
        btnEight.removeEventListener("click", leftOperandBtnPress);
        btnNine.removeEventListener("click", leftOperandBtnPress);
        btnZero.removeEventListener("click", leftOperandBtnPress);
        btnDecimal.removeEventListener("click", leftOperandBtnPress);
        btnPlus.removeEventListener("click", operatorBtnPress);
        btnMinus.removeEventListener("click", operatorBtnPress);
        btnMultiply.removeEventListener("click", operatorBtnPress);
        btnDivide.removeEventListener("click", operatorBtnPress);
        btnSquare.removeEventListener("click", operatorBtnPress);
        btnSqRoot.removeEventListener("click", operatorBtnPress);
        btnPosNeg.removeEventListener("click", negateLeftOperand);
        btnPosNeg.removeEventListener("click", negateRightOperand);
        btnEquals.removeEventListener("click", pressEquals);
    };

    //Takes the operator and performs the corresponding operation (multiply by 100 to deal with floating point numbers)
    var calculate = function () {
        switch (operator) {
            case "+" :
                total = ((leftOperandValueForMath * 100) + (rightOperandValueForMath * 100))/100;
                displayedLeftOperandValue = total;
                leftOperandValueForMath = total;
                enterRightOperand ();
                break;
            case "-" :
                total = ((leftOperandValueForMath * 100) - (rightOperandValueForMath * 100))/100;
                displayedLeftOperandValue = total;
                leftOperandValueForMath = total;
                enterRightOperand ();
                break;
            case "*" :
                total = ((leftOperandValueForMath * 100) * (rightOperandValueForMath * 100))/10000;
                displayedLeftOperandValue = total;
                leftOperandValueForMath = total;
                enterRightOperand ();
                break;
            case "/" :
                if (rightOperandValueForMath === 0) {
                    dividedByZero();
                } else {
                    total = (leftOperandValueForMath * 100) / (rightOperandValueForMath * 100);  //multiply by 100 then divide by 100 to bypass problems with floating point math
                    displayedLeftOperandValue = total;
                    leftOperandValueForMath = total;
                    enterRightOperand();
                }
                break;
            case "sq" :
                rightOperandValueForMath = leftOperandValueForMath;
                total = ((leftOperandValueForMath * 100) * (rightOperandValueForMath * 100))/10000;
                displayedLeftOperandValue = total;
                leftOperandValueForMath = total;
                enterRightOperand ();
                break;
            case "sqrt" :
                total = Math.sqrt(leftOperandValueForMath);
                displayedLeftOperandValue = total;
                leftOperandValueForMath = total;
                enterRightOperand ();
                break;
            default :
                enterRightOperand ();
        }
    };

    //Handles and equal button press
    var pressEquals = function () {
        calculate();
        operatorDisplay.setAttribute("value", "");
        operator = "";
        operatorCounter = 0;
        displayedRightOperand.setAttribute("value", "");
        displayedRightOperandValue = 0;
        rightOperandValueForMath = 0;
        decimalPressCounter = 0;
    };

    //Resets the calculator when clear is pressed
    var pressClear = function () {
        operatorDisplay.setAttribute("value", "");
        operator = "";
        operatorCounter = 0;
        displayedLeftOperand.setAttribute("value", 0);
        displayedLeftOperandValue = 0;
        leftOperandValueForMath = 0;
        displayedRightOperand.setAttribute("value", "");
        displayedRightOperandValue = 0;
        rightOperandValueForMath = 0;
        decimalPressCounter = 0;
        $("#msg").addClass("invisible");
        enterLeftOperand();
    };

    enterLeftOperand();
})();

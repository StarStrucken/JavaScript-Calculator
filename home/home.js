//home/home.js

//operation buttons
let addButton, subButton, multButton, diviButton;

//number buttons
let button0, button1, button2, button3, button4, button5, button6, button7, button8, button9;

//essential buttons
let enterButton, clearButton, deleteButton, powerButton;

//extra buttons for later
let deciButton, negButton;

//key variables
let userInput = [];
let equation = [];
let display = "0";
let displayAnswer = "";
let onOff = 2;
let val = 60;

//big nested array of objects relating to the order of operations function
const orderOfOperations = {
	//defines the operators and their properties when calculating
	operators: {
		'/': function(num1, num2) {return num1 / num2},
		'×': function(num1, num2) {return num1 * num2},
		'+': function(num1, num2) {return num1 + num2},
		'-': function(num1, num2) {return num1 - num2},
	},
	//identifies where the order and segments of the equation should be calculated [element 1, operator, element 2]
	indexOfEquation(index, equation) {
		num1 = parseFloat(equation[index - 1]);
		num2 = parseFloat(equation[index + 1]);
		return [num1, num2];
	},
	//splice returns the answer of each segment in equation back to the equation array
	newTotal(index, amount, equation) {
		equation.splice((index - 1), 3, amount);
		return equation;
	},
	//collects all the data from the previous nested objects and organizes them for calculations
	calculationSequence(operation, indexOfOperand, equation) {
		//getNums runs the indexOfEquation using the current equation and where the operands are
		getNums = orderOfOperations.indexOfEquation(indexOfOperand, equation),
		//amountForEquation runs the operators and identifies the most imporatant operands in getNums (using spread syntax)
		amountForEquation = orderOfOperations.operators[operation](...getNums),
		//newEquation finally runs the newTotal and essentially returns the new segment amount back into the equation array, creating a new equation
		newEquation = orderOfOperations.newTotal(indexOfOperand, amountForEquation, equation);
		return newEquation;
	}
}

//image and sound variables
let battery, logo, buttonSound;


//sets up the images to their variables
function preload() {
	battery = loadImage("../images/battery.png");
	logo = loadImage("../images/logo.png");
	buttonSound = loadSound("sounds/buttonClicked.mp3");
}//end preload


//sets up the buttons and canvas
function setup() {
	let sketch = createCanvas(585, 910);
	sketch.parent("mycanvas");
	background(173, 216, 230);

	//addition button
	addButton = createButton("+");
	addButton.parent("mycanvas");
	addButton.position(470, 725);
	addButton.mousePressed(function() { operatorButton("+") });
	addButton.style("background-color", "#90ee90");
	//subtraction button
	subButton = createButton("-");
	subButton.parent("mycanvas");
	subButton.position(470, 625);
	subButton.mousePressed(function() { operatorButton("-") });
	subButton.style("background-color", "#90ee90");
	//multiplication button
	multButton = createButton("×");
	multButton.parent("mycanvas");
	multButton.position(470, 525);
	multButton.mousePressed(function() { operatorButton("×") });
	multButton.style("background-color", "#90ee90");
	//division button
	diviButton = createButton("÷");
	diviButton.parent("mycanvas");
	diviButton.position(470, 425);
	diviButton.mousePressed(function() { operatorButton("/") });
	diviButton.style("background-color", "#90ee90");
	//button0
	button0 = createButton("0");
	button0.parent("mycanvas");
	button0.position(140, 725);
	button0.mousePressed(function() { numberButton(0) });
	//button1
	button1 = createButton("1");
	button1.parent("mycanvas");
	button1.position(140, 625);
	button1.mousePressed(function() { numberButton(1) });
	//button2
	button2 = createButton("2");
	button2.parent("mycanvas");
	button2.position(250, 625);
	button2.mousePressed(function() { numberButton(2) });
	//button3
	button3 = createButton("3");
	button3.parent("mycanvas");
	button3.position(360, 625);
	button3.mousePressed(function() { numberButton(3) });
	//button4
	button4 = createButton("4");
	button4.parent("mycanvas");
	button4.position(140, 525);
	button4.mousePressed(function() { numberButton(4) });
	//button5
	button5 = createButton("5");
	button5.parent("mycanvas");
	button5.position(250, 525);
	button5.mousePressed(function() { numberButton(5) });
	//button6
	button6 = createButton("6");
	button6.parent("mycanvas");
	button6.position(360, 525);
	button6.mousePressed(function() { numberButton(6) });
	//button7
	button7 = createButton("7");
	button7.parent("mycanvas");
	button7.position(140, 425);
	button7.mousePressed(function() { numberButton(7) });
	//button8
	button8 = createButton("8");
	button8.parent("mycanvas");
	button8.position(250, 425);
	button8.mousePressed(function() { numberButton(8) });
	//button9
	button9 = createButton("9");
	button9.parent("mycanvas");
	button9.position(360, 425);
	button9.mousePressed(function() { numberButton(9) });
	//decimal button
	deciButton = createButton(".");
	deciButton.parent("mycanvas");
	deciButton.position(250, 725);
	deciButton.mousePressed(function() { numberButton('.') });
	//negative button
	negButton = createButton("-");
	negButton.parent("mycanvas");
	negButton.position(360, 725);
	negButton.mousePressed();
	//equals button
	enterButton = createButton("=");
	enterButton.parent("mycanvas");
	enterButton.position(30, 725);
	enterButton.mousePressed(function() { calculateEquationV2(equation) });
	enterButton.style("background-color", "#ff6c70");
	//clear button
	clearButton = createButton("C");
	clearButton.parent("mycanvas");
	clearButton.position(30, 625);
	clearButton.mousePressed(function() { clearAll() });
	clearButton.style("background-color", "#ff6c70");
	//delete button
	deleteButton = createButton("D");
	deleteButton.parent("mycanvas");
	deleteButton.position(30, 525);
	deleteButton.mousePressed(function() { backspace() });
	deleteButton.style("background-color", "#ff6c70");
	//power button
	powerButton = createButton("P");
	powerButton.parent("mycanvas");
	powerButton.position(30, 425);
	powerButton.mousePressed(function() { power() });
	powerButton.style("background-color", "#ff6c70");
}//end setup


//loops the function displayScreen() infinitely as well as calculator background
function draw() {
	//calculator body shadow
	fill("#999");
	noStroke();
	rect(0, 0, 585, 910, 40);

	//calculator body (light black)
	fill(35, 31, 32);
	noStroke();
	rect(0, 0, 575, 900, 40);

	//calls the function for the display screen
	displayScreen();

	//images and text for decoration
	image(logo, 105, 835, 60, 40);
	fill(255);
	textFont("Crimson Text");
	text("IVAN TECHNOLOGIES", 170, 840);
	textFont("Arimo");
	textStyle(BOLD);
	textSize(40);
	text("IT-22", 185, 30);
	textFont("Lato");
	textSize(36);
	text("Plus CE", 285, 32);
	textStyle(NORMAL);

	//display of answer once calculated
	fill(0);
	textFont("Arimo");
	textSize(30);
	text(displayAnswer, 85, 313);
}//end draw


//display screen including the answer to equation once calculated
function displayScreen() {
	if (onOff % 2 !== 0) {
		//black background
		fill(0);
		rect(30, 80, 515, 300, 30);

		//gray -> white and gray rectangle
		val += 7.5;
		fill(val);
		rectMode(CENTER);
		rect(290, 230, 425, 250);
		rectMode(CORNER);
		fill(155);
		rect(77.5, 105, 425, 40);

		//settings for display text
		fill(0);
		textFont("Arimo");
		textSize(30);
		textAlign(LEFT, TOP);
		text(display, 85, 155);

		//battery logo
		image(battery, 425, 82.5, 80, 90);

	} else {
		//black background
		fill(0);
		rect(30, 80, 515, 300, 30);

		//white -> gray rectangle
		if (val > 60) {
			val -= 25;
		} else {
			val = 60;
		}
		fill(val);
		rectMode(CENTER);
		rect(290, 230, 425, 250);
		rectMode(CORNER);
		textAlign(LEFT, TOP);
	}
}//end displayScreen

//turns the calculator on and off
function power() {

	//button sound when clicked
	buttonSound.play();

	//clears the equation and turns the calculator off or on
	onOff += 1;
	equation = [];
	userInput = [];
	display = "0";
	displayAnswer = "";
}//end power

//calculates the equation when the equal button is pressed
//edit: version 1 that did not calculate with order of operations; not in use right now
function calculateEquationV1(equation) {
	if (onOff % 2 !== 0) {
		buttonSound.play();
		if (userInput !== 0) {
			userInput = parseFloat(userInput);

			addToEquation(userInput);
		}
		var answer = equation[0];
		var dividedByZero = 0;
		for (var i = 2; i < equation.length; i = i + 2) {

			switch (equation[i - 1]) {

				case '+':
					answer += equation[i];
					break;

				case '-':
					answer -= equation[i];
					break;

				case '/':
					if (equation[i] === 0) {
						dividedByZero = 1;
					} else {
						answer /= equation[i];
					}
					break;

				case '×':
					answer *= equation[i];
					break;
			}
		}

		answer = answer.toFixed(10);
		answer = parseFloat(answer);

		if (dividedByZero === 1 || isNaN(answer)) {
			displayAnswer = "ERROR";
		}
		else {
			displayAnswer = answer;
			userInput = answer;
			equation = [];
		}
	}
}//end calculateEquationV1


//version 2: calculates the equation with orderOfOperations when the equal button is pressed; in use currently
function calculateEquationV2(equation) {
	if (onOff % 2 !== 0) {
		buttonSound.play();
		if (userInput !== 0) {
			userInput = parseFloat(userInput);
	
			addToEquation(userInput);
		}
		//runs through the function operators in highest precedence due to Object.keys; forEach returns the operator order that the calculation should follow through
		Object.keys(orderOfOperations.operators).forEach(function(amount) {
			//runs forever until the newEquation does not include any operations (therefore the solution)
			while (equation.includes(amount)) {
				//assigns indexOfOperand as the indexOf the operator of segment of equation
				indexOfOperand = equation.indexOf(amount);
				//runs calculationSequence into equation so it becomes the newEquation
				equation = orderOfOperations.calculationSequence(amount, indexOfOperand, equation);
			};
		});
		
		var answer = equation[0];
		answer = answer.toFixed(10);
		answer = parseFloat(answer);
	
		if (isNaN(answer)) {
			displayAnswer = "ERROR";
		} else {
			displayAnswer = answer;
			userInput = answer;
			equation = [];
		}
	}
}//end calculateEquationV2


//clears the display and displayAnswer
function clearAll() {
	if (onOff % 2 !== 0) {
		//button sound when clicked
		buttonSound.play();

		equation = [];
		userInput = [];
		display = "0";
		displayAnswer = "";
	}
}//end clearAll


//deletes the last input
function backspace() {
	if (onOff % 2 !== 0) {
		//button sound when clicked
		buttonSound.play();

		if (displayAnswer === "" && display !== "0") {
			display = display.substring(0, display.length - 1);
			userInput = userInput.substring(0, userInput.length - 1);
		}
		
		if (display === "0" || display === "") {
			display = "0";
		}
	}
}//end backspace


//adds new input into the equation to be calculated
function addToEquation(userInput) {
	if (onOff % 2 !== 0) {
		//button sound when clicked
		buttonSound.play();
		/*(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push)*/
		equation.push(userInput);
	}
}//end addToEquation


//numeric buttons function which adds a number pressed to "number" and then display
function numberButton(num) {
	if (onOff % 2 !== 0) {
		//button sound when clicked
		buttonSound.play();

		//clears the 0 in front and inputs the number
		if (display === "0" && num != ".") {
			display = "";
		}

		//locks the decimal button to only one number 
		if (!(num === ".") || !userInput.match(/[.]/)) {
			userInput += num;
			display += num;
		}

		//resets equation and inputs the number
		if (displayAnswer !== "") {
			clearAll();
			display = "";
			userInput += num;
			display += num;
		}
	}
}//end numberButton


//operation buttons function which adds an operation pressed to "operator" and then display
function operatorButton(opr) {
	if (onOff % 2 !== 0) {
		buttonSound.play();
		if (userInput !== 0 && userInput !== "-") {
			userInput = parseFloat(userInput);
			addToEquation(userInput);
			addToEquation(opr);
			display += opr;
			userInput = [];
		}

		if (displayAnswer !== "" && (displayAnswer !== "ERROR" || displayAnswer !== "-ERROR" || displayAnswer !== "-Infinity" || displayAnswer !== "Infinity")) {
			display = "";
			display = displayAnswer + opr;
			equation = [displayAnswer, opr];
			userInput = [];
			displayAnswer = "";
			console.log(equation);
			console.log(userInput);
		}
	}
}//end operatorButton


//keyboard can be used to calculate as well
function keyPressed() {
	if (key === '0') {
		numberButton(0);
	} else if (key === '1') {
		numberButton(1);
	} else if (key === '2') {
		numberButton(2);
	} else if (key === '3') {
		numberButton(3);
	} else if (key === '4') {
		numberButton(4);
	} else if (key === '5') {
		numberButton(5);
	} else if (key === '6') {
		numberButton(6);
	} else if (key === '7') {
		numberButton(7);
	} else if (key === '8') {
		numberButton(8);
	} else if (key === '9') {
		numberButton(9);
	} else if (key === '.') {
		numberButton('.');
	} else if (key === '+') {
		operatorButton('+');
	} else if (key === '-') {
		operatorButton('-');
	} else if (key === '/') {
		operatorButton('/');
	} else if (key === '*') {
		operatorButton('×');
	} else if (key === 'p' || key === 'P') {
		power();
	} else if (keyCode === BACKSPACE) {
		backspace();
	} else if (key === 'c' || key === 'C') {
		clearAll();
	} else if (keyCode === ENTER) {
		calculateEquationV2(equation);
	}
}//end keyPressed

//used to help determine locations for buttons and other objects (omittable)
function mousePressed() {
	console.log("MouseX: " + mouseX + " || " + "MouseY: " + mouseY);
	console.log("equation: " + equation);
	console.log("userInput: " + userInput);
	console.log("display: " + display);
	console.log("displayAnswer: " + displayAnswer);
}//end mousePressed
var game = {};

game.init = function() {
	setupModeButtons();
	setupSquares();
	reset();
}

var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var title = document.getElementById("title");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

game.init();

function setupModeButtons() {
	for (var i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener("click", function() {
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");
			this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
			reset();
		});
	}

}

function setupSquares() {
	for (var i = 0; i < squares.length; i++) {
	//add click listeners to squares
		squares[i].addEventListener("click", function() {
			//grab color of clicked square
			var clickedColor = this.style.backgroundColor;

			//compare color to picked color
			if (clickedColor === pickedColor) {
				messageDisplay.textContent = "Correct!"
				resetButton.textContent = "Play Again?"
				changeColors(clickedColor);
				title.style.backgroundColor = clickedColor;
			}

			else {
				this.style.backgroundColor = "#232323";
				messageDisplay.textContent = "Try Again"
			}
		});
	}
}

function reset() {
	//generate all new colors
	colors = generateRandomColors(numSquares);
	//pick a new random color from array
	pickedColor = pickColor();
	//change colorDisplay to match picked color
	colorDisplay.textContent = pickedColor;
	resetButton.textContent = "New Colours";
	messageDisplay.textContent = "";

	//change colors of squares
	for (var i = 0; i < squares.length; i++) {
		if (colors[i]){
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];	
		} 
		else {
			squares[i].style.display = "none";
		}
		
	}

	title.style.backgroundColor = "steelblue";
}

resetButton.addEventListener("click", function() {
	reset();
});

// changes colors of squares to correct answer
function changeColors(color) {
	//loop through all squares
	for (var i = 0; i < squares.length; i++) {
		//change each color to match given color
		squares[i].style.backgroundColor = color;
	}
	
}

// function that picks random color
function pickColor () {
	var randNum = Math.floor(Math.random() * colors.length);
	return colors[randNum];
}

// function that generates number of random colors
function generateRandomColors(num) {
	// make an array
	var colorArr = [];
	// repeat num times

	for (var i = 0; i < num; i++) {
		// get random color and push into array
		colorArr.push(randomColor());
	}
	// return that array
	return colorArr;
}

//create random colors
function randomColor() {
	// pick a "red" from 0-255
	var r = Math.floor(Math.random() * 256);
	// pick a "green" from 0-255
	var g = Math.floor(Math.random() * 256);
	// pick a "blue" from 0-255
	var b =	Math.floor(Math.random() * 256);

	return "rgb(" + r + ", " + g + ", " + b + ")";
}

var numCircles = 9;


var circles = document.querySelectorAll(".circle");
var gameMode = document.querySelector("#gameMode");
var messageDisplay = document.querySelector("#message");
var resetBtn = document.querySelector("#reset");
var modes = document.querySelectorAll(".mode");
var h1 = document.querySelector("h1");


var flicker; 
var pickedColor;
var colors;


init();

function init(){
	flicker =true;
	pickedColor = getRandomColor();
	gameMode.textContent = pickedColor;
	setupMode();
	if (flicker === true){
		flickerColor();
	}

	colors = generateColorArray();
	updateCircles();
	setupCircles();
}



function setupMode(){
	for(let i = 0; i < modes.length; i++){

		modes[i].addEventListener("click", function(){
			modes[0].classList.remove("selected");
			modes[1].classList.remove("selected");
			if(modes[i].textContent === "RGB Finder"){
				flicker = false;
				this.classList.add("selected");

			}
			else{
				flicker = true;
				this.classList.add("selected");


			}
			reset();
		});

	}
}

function setupCircles(){
	for(let i = 0; i < numCircles; i++){
		circles[i].addEventListener("click", function(){
			var clickedColor = this.style.backgroundColor;
			if( clickedColor === pickedColor){
				toWinningColor();
				messageDisplay.textContent = "You Win!";
				h1.style.backgroundColor = pickedColor;
				resetBtn.textContent = "Play Again?";
			}
			else{
				this.style.backgroundColor = "#242F40";
				messageDisplay.textContent = "Try Again...";
			}
		})
	}

}
function reset(){
	resetBtn.textContent = "New Color";
	pickedColor = getRandomColor();
	gameMode.textContent = pickedColor;
	messageDisplay.textContent = "";
	colors = generateColorArray();

	if(flicker === true){
		flickerColor();
	}
	else{
		h1.style.backgroundColor = "#2292A4";
	}
	updateCircles();
	setupCircles();
	
}

resetBtn.addEventListener("click", function(){
	reset();
});

function toWinningColor(){
	for(let i = 0; i< numCircles; i++){
		circles[i].style.backgroundColor = pickedColor;
	}
}

function updateCircles(){
	for(let i = 0 ; i< numCircles; i++){
			circles[i].style.backgroundColor = colors[i];
	}	
}

function getRandomColor(){
	// Returns a random RBG String
	let r = Math.floor(Math.random() * 256);
	let g = Math.floor(Math.random() * 256);
	let b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")";
}

function flickerColor(){
	// Displays the picked color in middle circle, and hides all other circles
	messageDisplay.textContent = "Find the flickered color!";
	gameMode.textContent = "flickered color";
	h1.style.backgroundColor = pickedColor;
	setTimeout(function(){h1.style.backgroundColor = "#2292A4"}, 100);
}

function getRandomIndex(){
	// Returns random index 
	return Math.floor(Math.random() * numCircles);
}

function generateColorArray(){
	// Generates color array with Picked Color randomlly placed
	var randomIndex = getRandomIndex();
	var arr = [];
	for(let i = 0; i < numCircles; i++){
		if( i == randomIndex){
			arr.push(pickedColor);
		}
		else{
			arr.push(getRandomColor());
		}
	}
	return arr;
}
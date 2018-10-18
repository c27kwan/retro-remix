const FPS = 30;

var canvas;
var canvasContext;

window.onload = function() {
	canvas = document.getElementById("gameCanvas");
	canvasContext = canvas.getContext('2d');
	
	carInit();

	setInterval(function() {
		moveEverything();
		drawEverything();
	}, 1000/FPS);

	initInput();
}

function drawEverything() {
	// draw board
	colourRect(0, 0, canvas.width, canvas.height, "black");
	drawTracks();

	drawCar();
}

function moveEverything() {
	moveCar();
}

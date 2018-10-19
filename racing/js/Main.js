const FPS = 30;

var canvas;
var canvasContext;

window.onload = function() {
	canvas = document.getElementById("gameCanvas");
	canvasContext = canvas.getContext('2d');
	
	carInit();
	initInput();
	loadImages();
}

function startGame() {
	setInterval(function() {
		moveEverything();
		drawEverything();
	}, 1000/FPS);
}

function drawEverything() {
	drawTracks();
	drawCar();
}

function moveEverything() {
	moveCar();
}

const FPS = 30;

var canvas;
var canvasContext;
var p1 = new carClass();

window.onload = function() {
	canvas = document.getElementById("gameCanvas");
	canvasContext = canvas.getContext('2d');
	
	p1.carInit();
	initInput();
	p1.setupControls(KEY_UP_ARROW, KEY_DOWN_ARROW, KEY_LEFT_ARROW, KEY_RIGHT_ARROW);
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
	p1.drawCar();
}

function moveEverything() {
	p1.moveCar();
}

const FPS = 30;

var canvas;
var canvasContext;
var p1 = new carClass();
var p2 = new carClass();

window.onload = function() {
	canvas = document.getElementById("gameCanvas");
	canvasContext = canvas.getContext('2d');
	

	initInput();
	p1.setupControls(KEY_UP_ARROW, KEY_DOWN_ARROW, KEY_LEFT_ARROW, KEY_RIGHT_ARROW);
	p2.setupControls(KEY_LETTER_W, KEY_LETTER_S, KEY_LETTER_A, KEY_LETTER_D);
	loadImages();
}

function startGame() {
	p2.carInit(car2Pic, "Green Car");
	p1.carInit(carPic, "Blue Car");

	setInterval(function() {
		moveEverything();
		drawEverything();
	}, 1000/FPS);
}

function drawEverything() {
	drawTracks();
	p1.drawCar();
	p2.drawCar();
}

function moveEverything() {
	p1.moveCar();
	p2.moveCar();
}

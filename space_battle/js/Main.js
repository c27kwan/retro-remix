const FPS = 30;

var canvas;
var canvasContext;
var p1 = new shipClass();

window.onload = function() {
	canvas = document.getElementById("gameCanvas");
	canvasContext = canvas.getContext('2d');
	

	initInput();
	p1.setupControls(KEY_UP_ARROW, KEY_LEFT_ARROW, KEY_RIGHT_ARROW);
	loadImages();
}

function startGame() {
	p1.init(playerPic);

	setInterval(function() {
		moveEverything();
		drawEverything();
	}, 1000/FPS);
}

function drawEverything() {
	colourRect(0, 0, canvas.width, canvas.height, "black");
	p1.draw();
}

function moveEverything() {
	p1.move();
}

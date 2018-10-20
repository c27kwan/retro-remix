const FPS = 30;

var canvas;
var canvasContext;
var p1 = new warriorClass();

window.onload = function() {
	canvas = document.getElementById("gameCanvas");
	canvasContext = canvas.getContext('2d');
	

	initInput();
	loadImages();
}

function startGame() {
	p1.init(playerPic, "Player");

	setInterval(function() {
		moveEverything();
		drawEverything();
	}, 1000/FPS);
}

function drawEverything() {
	drawRoom();
	p1.draw();
}

function moveEverything() {
	p1.move();
}

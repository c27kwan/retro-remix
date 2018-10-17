const FPS = 30;
const GROUNDSPEED_DECAY_MULT = 0.94, DRIVE_POWER = 0.5, REVERSE_POWER = 0.2, TURN_RATE = 0.03, MIN_TURN_SPEED = DRIVE_POWER;
const TRACK_W = 40, TRACK_H = 40, TRACK_GAP = 1, TRACK_COLS = 20, TRACK_ROWS = 15;
const KEY_LEFT_ARROW = 37, KEY_UP_ARROW = 38, KEY_RIGHT_ARROW = 39, KEY_DOWN_ARROW = 40;

var canvas;
var canvasContext;
var carX, carY;
var carSpeed;

var keyHeld_Gas = false;
var keyHeld_Reverse = false;
var keyHeld_TurnLeft = false;
var keyHeld_TurnRight = false;

const TRACK_ENUM = {
	ROAD: 0,
	WALL: 1,
	PLAYER: 2,
};

var trackGrid =
[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
  1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1,
  1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1,
  1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1,
  1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
  1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
  1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
  1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
  1, 0, 2, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1,
  1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

var carPic = document.createElement("img");
var carPicLoaded = false;
var carAng = -Math.PI/2;

carPic.onload = function() {
	carPicLoaded = true;
}

window.onload = function() {
	canvas = document.getElementById("gameCanvas");
	canvasContext = canvas.getContext('2d');

	carPic.src = "blue_car.png";
	carPic.height = 20;
	carPic.width = 10;
	resetCar();

	setInterval(function() {
		moveEverything();
		drawEverything();
	}, 1000/FPS);

	document.addEventListener("keydown", keyPressed);
	document.addEventListener("keyup", keyReleased);

}

function setKeyHoldState(keyCode, state) {
	switch(keyCode) {
		case KEY_DOWN_ARROW:
			keyHeld_Reverse = state;
			break;
		case KEY_LEFT_ARROW:
			keyHeld_TurnLeft = state;
			break;
		case KEY_UP_ARROW:
			keyHeld_Gas = state;
			break;
		case KEY_RIGHT_ARROW:
			keyHeld_TurnRight = state;
			break; 
	}
}

function keyPressed(evt) {
	setKeyHoldState(evt.keyCode, true);
	evt.preventDefault();
}

function keyReleased(evt) {
	setKeyHoldState(evt.keyCode, false);
}

function resetCar() {
	var tileRow; 
	var tileCol;
	for (var i = 0; i < trackGrid.length; ++i) {
		if (trackGrid[i] == TRACK_ENUM.PLAYER) {
			tileRow = Math.floor(i/TRACK_COLS);
			tileCol = i % TRACK_COLS;
			trackGrid[i] = TRACK_ENUM.ROAD;
			break;
		}
	}
	carX = (tileCol + 0.5) * TRACK_W;
	carY = (tileRow + 0.8) * TRACK_H;
	carSpeed = 0;
	console.log("Car start pos (" + carX + ", " + carY + ")");
	console.log("Car tiles are (" + tileCol + ", " + tileRow + ")");
}

function trackTileToIndex(col, row) {
	return row * TRACK_COLS + col;
}

function isWallAtTileCoord(col, row) {
	return (trackGrid[trackTileToIndex(col, row)] == TRACK_ENUM.WALL);
}

function checkForTrackAtPixelCoord(pixelX, pixelY) {
	var col = Math.floor(pixelX / TRACK_W);
	var row = Math.floor(pixelY / TRACK_H);

	console.log("col: " + col + " row: " + row);
	console.log(trackGrid);

	if (col >=0 && col < TRACK_COLS && row >=0 && row < TRACK_ROWS) {
		var tileIndex = trackTileToIndex(col, row); 
		return (trackGrid[tileIndex] == TRACK_ENUM.ROAD);
	}
	return false;
}

function colourRect(topX, topY, boxWidth, boxHeight, colour) {
	canvasContext.fillStyle = colour;
	canvasContext.fillRect(topX, topY, boxWidth, boxHeight);
}

function colourCircle(centerX, centerY, radius, colour) {
	canvasContext.fillStyle = colour;
	canvasContext.beginPath();
	canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
	canvasContext.fill();
}

function moveCar() {
	if (keyHeld_Gas) {
		carSpeed += DRIVE_POWER;
	}
	if (keyHeld_Reverse) {
		carSpeed -= REVERSE_POWER;
	}
	if (Math.abs(carSpeed) >= MIN_TURN_SPEED) { // don't let car turn in place
		if (keyHeld_TurnLeft) {
			carAng -= TURN_RATE* Math.PI;
		}

		if (keyHeld_TurnRight){
			carAng += TURN_RATE * Math.PI;	
		}
	}

	var nextX = carX + Math.cos(carAng) * carSpeed;
	var nextY = carY + Math.sin(carAng) * carSpeed;

	
	if (checkForTrackAtPixelCoord(nextX, nextY)) {
		console.log("yay");
		carX = nextX;
		carY = nextY;
	} else {
		console.log("nay");
		carSpeed *= -0.5;

	}
}

function drawBitmapCenteredAtLocationWithRotation(graphic, x, y, ang) {
	canvasContext.save(); // allows rollback
	canvasContext.translate(x, y); // point where img goes
	canvasContext.rotate(ang);
	canvasContext.drawImage(graphic, -graphic.width/2,- graphic.height/2);
	canvasContext.restore(); // undos tanslation and rotation
}

function drawCar() {
	if (carPicLoaded) {
		drawBitmapCenteredAtLocationWithRotation(carPic, carX, carY, carAng);
	}
}

function drawTracks() {
	for(var i = 0; i < TRACK_COLS; ++i) {
		for (var j = 0; j < TRACK_ROWS; ++j) {
			if (isWallAtTileCoord(i, j)) {
				colourRect(i * TRACK_W, j * TRACK_H, TRACK_W - TRACK_GAP, TRACK_H - TRACK_GAP,"blue");
			}
		}
	}
}

function drawEverything() {
	// draw board
	colourRect(0, 0, canvas.width, canvas.height, "black");
	drawTracks();

	drawCar();
}

function moveEverything() {
	moveCar();
	carSpeed *= GROUNDSPEED_DECAY_MULT;
}

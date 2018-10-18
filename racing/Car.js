const GROUNDSPEED_DECAY_MULT = 0.94, DRIVE_POWER = 0.5, REVERSE_POWER = 0.2, TURN_RATE = 0.03, MIN_TURN_SPEED = DRIVE_POWER;

var carX, carY;
var carSpeed;
var carPic = document.createElement("img");
var carPicLoaded = false;
var carAng = -Math.PI/2;

carPic.onload = function() {
	carPicLoaded = true;
}

function carInit() {
	carPic.src = "blue_car.png";
	carPic.height = 20;
	carPic.width = 10;
	resetCar();
}

function drawCar() {
	if (carPicLoaded) {
		drawBitmapCenteredAtLocationWithRotation(carPic, carX, carY, carAng);
	}
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
		carX = nextX;
		carY = nextY;
	} else {
		carSpeed *= -0.5;
	}

	carSpeed *= GROUNDSPEED_DECAY_MULT;
}


const GROUNDSPEED_DECAY_MULT = 0.94, DRIVE_POWER = 0.5, REVERSE_POWER = 0.2, TURN_RATE = 0.03, MIN_TURN_SPEED = DRIVE_POWER;

function carClass() {
	this.carX;
	this.carY;
	this.carSpeed;
	this.carAng;

	this.keyHeld_Gas = false;
	this.keyHeld_Reverse = false;
	this.keyHeld_TurnLeft = false;
	this.keyHeld_TurnRight = false;

	this.setupControls = function(forwardKey, backKey, leftKey, rightKey) {
		this.controlKeyForGas = forwardKey;
		this.controlKeyForReverse = backKey;
		this.controlKeyForTurnLeft = leftKey;
		this.controlKeyForTurnRight = rightKey;
	}

	this.carInit = function(pic, name) {
		this.carBitmap = pic;
		this.carName = name;
		this.resetCar();
	}

	this.drawCar = function () {
		drawBitmapCenteredAtLocationWithRotation(this.carBitmap, this.carX, this.carY, this.carAng);
	}

	this.resetCar = function() {
		if (this.homeX == undefined) {
			for (var i = 0; i < trackGrid.length; ++i) {
				if (trackGrid[i] == TRACK_ENUM.PLAYER) {
					var tileRow = Math.floor(i/TRACK_COLS);
					var tileCol = i % TRACK_COLS;
					trackGrid[i] = TRACK_ENUM.ROAD;
					this.homeX = (tileCol + 0.5) * TRACK_W;
					this.homeY = (tileRow + 0.8) * TRACK_H;
					break;
				}
			}	
		}
		this.carX = this.homeX;
		this.carY = this.homeY;
		this.carSpeed = 0;
		this.carAng = -Math.PI/2;
	}

	this.moveCar = function () {
		if (this.keyHeld_Gas) {
			this.carSpeed += DRIVE_POWER;
		}
		if (this.keyHeld_Reverse) {
			this.carSpeed -= REVERSE_POWER;
		}
		if (Math.abs(this.carSpeed) >= MIN_TURN_SPEED) { // don't let car turn in place
			if (this.keyHeld_TurnLeft) {
				this.carAng -= TURN_RATE* Math.PI;
			}

			if (this.keyHeld_TurnRight){
				this.carAng += TURN_RATE * Math.PI;	
			}
		}

		var nextX = this.carX + Math.cos(this.carAng) * this.carSpeed;
		var nextY = this.carY + Math.sin(this.carAng) * this.carSpeed;
		nextTrackTileType = getTrackAtPixelCoord(nextX, nextY);
		
		if (nextTrackTileType == TRACK_ENUM.ROAD) {
			this.carX = nextX;
			this.carY = nextY;
		} else if (nextTrackTileType == TRACK_ENUM.GOAL) {
			console.log(this.carName + " is the winner!");
			p1.resetCar();
			p2.resetCar();
		} else {
			this.carSpeed *= -0.5;
		}

		this.carSpeed *= GROUNDSPEED_DECAY_MULT;
	}
}
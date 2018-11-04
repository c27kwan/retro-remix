const GROUNDSPEED_DECAY_MULT = 0.94, DRIVE_POWER = 0.5, REVERSE_POWER = 0.2, TURN_RATE = 0.03, MIN_TURN_SPEED = DRIVE_POWER;

function shipClass() {
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

	this.init = function(pic) {
		this.bitmap = pic;
		this.reset();
	}

	this.draw = function () {
		drawBitmapCenteredAtLocationWithRotation(this.bitmap, this.x, this.y, this.ang);
	}

	this.reset = function() {
		this.x = canvas.width/2;
		this.y = canvas.height/2;
		this.speed = 0;
		this.ang = -Math.PI/2;
	}

	this.move = function () {
		if (this.keyHeld_Gas) {
			this.speed += DRIVE_POWER;
		}
		if (this.keyHeld_Reverse) {
			this.speed -= REVERSE_POWER;
		}
		if (Math.abs(this.speed) >= MIN_TURN_SPEED) { // don't turn in place
			if (this.keyHeld_TurnLeft) {
				this.ang -= TURN_RATE* Math.PI;
			}

			if (this.keyHeld_TurnRight){
				this.ang += TURN_RATE * Math.PI;
			}
		}

		var nextX = this.x + Math.cos(this.ang) * this.speed;
		var nextY = this.y + Math.sin(this.ang) * this.speed;
		this.x = nextX;
		this.y = nextY;
		this.speed *= GROUNDSPEED_DECAY_MULT;
	}
}
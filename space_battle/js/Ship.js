const SPACESPEED_DECAY_MULT = 0.99, THRUST_POWER = 0.5, TURN_RATE = 0.03;

function shipClass() {
	this.keyHeld_Gas = false;
	this.keyHeld_TurnLeft = false;
	this.keyHeld_TurnRight = false;

	this.setupControls = function(forwardKey, leftKey, rightKey) {
		this.controlKeyForGas = forwardKey;
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
			this.speed += THRUST_POWER;
		}

        if (this.keyHeld_TurnLeft) {
            this.ang -= TURN_RATE * Math.PI;
        }

        if (this.keyHeld_TurnRight) {
            this.ang += TURN_RATE * Math.PI;
        }

		var nextX = this.x + Math.cos(this.ang) * this.speed;
		var nextY = this.y + Math.sin(this.ang) * this.speed;
		this.x = nextX;
		this.y = nextY;
		this.speed *= SPACESPEED_DECAY_MULT;
		this.handleScreenWrap();
	}

	this.handleScreenWrap = function() {
		if (this.x + playerPic.width/2 > canvas.width) {
			this.x -= canvas.width;
		} else if (this.x + playerPic.width/2 < 0) {
			this.x += canvas.width;
		}

		if (this.y + playerPic.height/2 > canvas.height) {
			this.y -= canvas.height;
		} else if (this.y + playerPic.height/2 < 0) {
			this.y += canvas.height;
		}
	}
}
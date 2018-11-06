const KEY_LEFT_ARROW = 37, KEY_UP_ARROW = 38, KEY_RIGHT_ARROW = 39, KEY_DOWN_ARROW = 40;
const KEY_LETTER_W = 87, KEY_LETTER_A = 65, KEY_LETTER_S = 83, KEY_LETTER_D = 68;
const SPACE_BAR = 32;

function initInput() {
	document.addEventListener("keydown", keyPressed);
	document.addEventListener("keyup", keyReleased);
}

function setKeyHoldState(keyCode, thisShip, state) {
	switch(keyCode) {
		case thisShip.controlKeyForTurnLeft:
			thisShip.keyHeld_TurnLeft = state;
			break;
		case thisShip.controlKeyForGas:
			thisShip.keyHeld_Gas = state;
			break;
		case thisShip.controlKeyForTurnRight:
			thisShip.keyHeld_TurnRight = state;
			break;
		case thisShip.controlKeyForFire:
			thisShip.fireCannon();
			break;
	}
}

function keyPressed(evt) {
	setKeyHoldState(evt.keyCode, p1, true);
	evt.preventDefault();
}

function keyReleased(evt) {
	setKeyHoldState(evt.keyCode, p1, false);
}


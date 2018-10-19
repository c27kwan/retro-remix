const KEY_LEFT_ARROW = 37, KEY_UP_ARROW = 38, KEY_RIGHT_ARROW = 39, KEY_DOWN_ARROW = 40;
const KEY_LETTER_W = 87, KEY_LETTER_A = 65, KEY_LETTER_S = 83, KEY_LETTER_D = 68;

function initInput() {
	document.addEventListener("keydown", keyPressed);
	document.addEventListener("keyup", keyReleased);
}

function setKeyHoldState(keyCode, thisCar, state) {
	switch(keyCode) {
		case thisCar.controlKeyForReverse:
			thisCar.keyHeld_Reverse = state;
			break;
		case thisCar.controlKeyForTurnLeft:
			thisCar.keyHeld_TurnLeft = state;
			break;
		case thisCar.controlKeyForGas:
			thisCar.keyHeld_Gas = state;
			break;
		case thisCar.controlKeyForTurnRight:
			thisCar.keyHeld_TurnRight = state;
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


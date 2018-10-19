const KEY_LEFT_ARROW = 37, KEY_UP_ARROW = 38, KEY_RIGHT_ARROW = 39, KEY_DOWN_ARROW = 40;

var keyHeld_Gas = false;
var keyHeld_Reverse = false;
var keyHeld_TurnLeft = false;
var keyHeld_TurnRight = false;


function initInput() {
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


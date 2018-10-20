const KEY_LEFT_ARROW = 37, KEY_UP_ARROW = 38, KEY_RIGHT_ARROW = 39, KEY_DOWN_ARROW = 40;

function initInput() {
	document.addEventListener("keydown", keyPressed);
	document.addEventListener("keyup", keyReleased);
	p1.setupControls(KEY_UP_ARROW, KEY_RIGHT_ARROW, KEY_DOWN_ARROW, KEY_LEFT_ARROW);
}

function setKeyHoldState(keyCode, thisPlayer, state) {
	switch(keyCode) {
		case thisPlayer.controlKeyForNorth:
			thisPlayer.keyHeld_North = state;
			break;
		case thisPlayer.controlKeyForEast:
			thisPlayer.keyHeld_East = state;
			break; 
		case thisPlayer.controlKeyForSouth:
			thisPlayer.keyHeld_South = state;
			break;
		case thisPlayer.controlKeyForWest:
			thisPlayer.keyHeld_West = state;
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


const TRACK_W = 40, TRACK_H = 40, TRACK_COLS = 20, TRACK_ROWS = 15;
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

function trackTileToIndex(col, row) {
	return row * TRACK_COLS + col;
}

function isWallAtTileCoord(col, row) {
	return (trackGrid[trackTileToIndex(col, row)] == TRACK_ENUM.WALL);
}

function checkForTrackAtPixelCoord(pixelX, pixelY) {
	var col = Math.floor(pixelX / TRACK_W);
	var row = Math.floor(pixelY / TRACK_H);

	if (col >=0 && col < TRACK_COLS && row >=0 && row < TRACK_ROWS) {
		var tileIndex = trackTileToIndex(col, row); 
		return (trackGrid[tileIndex] == TRACK_ENUM.ROAD);
	}
	return false;
}

function drawTracks() {
	for(var i = 0; i < TRACK_COLS; ++i) {
		for (var j = 0; j < TRACK_ROWS; ++j) {
			if (isWallAtTileCoord(i, j)) {
				canvasContext.drawImage(trackWallPic, i * TRACK_W, j * TRACK_H);
			} else {
				canvasContext.drawImage(trackRoadPic, i * TRACK_W, j * TRACK_H);
			}
		}
	}
}


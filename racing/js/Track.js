const TRACK_W = 40, TRACK_H = 40, TRACK_COLS = 20, TRACK_ROWS = 15;
const TRACK_ENUM = {
	ROAD: 0,
	WALL: 1,
	PLAYER: 2,
	GOAL: 3,
	TREE: 4, 
	CONE: 5
};

var trackGrid =
[ 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4,
  4, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
  1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1,
  1, 0, 0, 0, 1, 1, 1, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 0, 0, 1,
  1, 0, 0, 1, 1, 0, 0, 1, 4, 4, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1,
  1, 0, 0, 1, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
  1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 5, 0, 0, 1, 0, 0, 1,
  1, 2, 2, 1, 0, 0, 5, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
  1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1,
  1, 1, 1, 1, 0, 5, 1, 1, 0, 0, 5, 0, 0, 1, 0, 0, 5, 0, 0, 1,
  1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
  0, 3, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
  0, 3, 0, 0, 0, 0, 1, 4, 4, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1];

function trackTileToIndex(col, row) {
	return row * TRACK_COLS + col;
}

function isWallAtTileCoord(col, row) {
	return (trackGrid[trackTileToIndex(col, row)] == TRACK_ENUM.WALL);
}

function getTrackAtPixelCoord(pixelX, pixelY) {
	var col = Math.floor(pixelX / TRACK_W);
	var row = Math.floor(pixelY / TRACK_H);

	if (col >=0 && col < TRACK_COLS && row >=0 && row < TRACK_ROWS) {
		var tileIndex = trackTileToIndex(col, row); 
		return trackGrid[tileIndex];
	}
	return TRACK_ENUM.WALL;
}

function drawTracks() {
	var trackIndex = 0;
	var trackLeftEdgeX = 0;
	var trackTopEdgeY = 0;

	for (var j = 0; j < TRACK_ROWS; ++j) {
		trackLeftEdgeX = 0;
		for(var i = 0; i < TRACK_COLS; ++i) {
			var trackType = trackGrid[trackIndex];
			canvasContext.drawImage(trackPics[trackType], trackLeftEdgeX, trackTopEdgeY);

			++trackIndex;
			trackLeftEdgeX += TRACK_W;
		}
		trackTopEdgeY += TRACK_H;
	}
}


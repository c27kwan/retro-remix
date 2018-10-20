const TILE_W = 50, TILE_H = 50, ROOM_COLS = 16, ROOM_ROWS = 12;
const TILE = {
	FLOOR: 0,
	WALL: 1,
	PLAYER: 2,
	GOAL: 3,
	KEY: 4, 
	DOOR: 5
};

var roomGrid =
[ 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4,
  4, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
  1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1,
  1, 0, 0, 0, 1, 1, 4, 4, 4, 4, 1, 1, 1, 0, 0, 1,
  1, 0, 0, 1, 1, 0, 1, 4, 4, 1, 1, 0, 0, 0, 0, 1,
  1, 0, 0, 1, 0, 0, 0, 1, 4, 1, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 5, 0, 0, 1,
  1, 0, 2, 1, 0, 5, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1,
  1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1,
  1, 1, 1, 1, 0, 1, 1, 0, 0, 5, 0, 0, 1, 0, 0, 1,
  1, 1, 1, 1, 3, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1];

function roomTileToIndex(col, row) {
	return row * ROOM_COLS + col;
}

function isWallAtTileCoord(col, row) {
	return (roomGrid[roomTileToIndex(col, row)] == TILE.WALL);
}

function getTileAtPixelCoord(pixelX, pixelY) {
	var col = Math.floor(pixelX / TILE_W);
	var row = Math.floor(pixelY / TILE_H);

	if (col >=0 && col < ROOM_COLS && row >=0 && row < ROOM_ROWS) {
		var tileIndex = roomTileToIndex(col, row); 
		return roomGrid[tileIndex];
	}
	return TILE.WALL;
}

function drawRoom() {
	var tileIndex = 0;
	var tileLeftEdgeX = 0;
	var tileTopEdgeY = 0;

	for (var j = 0; j < ROOM_ROWS; ++j) {
		tileLeftEdgeX = 0;
		for(var i = 0; i < ROOM_COLS; ++i) {
			var tileType = roomGrid[tileIndex];
			canvasContext.drawImage(tilePics[tileType], tileLeftEdgeX, tileTopEdgeY);

			++tileIndex;
			tileLeftEdgeX += TILE_W;
		}
		tileTopEdgeY += TILE_H;
	}
}


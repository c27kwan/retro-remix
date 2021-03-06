const PLAYER_MOVE_SPEED = 3.0;

function warriorClass() {
	this.x;
	this.y;

	this.keyHeld_North = false;
	this.keyHeld_South = false;
	this.keyHeld_West = false;
	this.keyHeld_East = false;

	this.setupControls = function(northKey, eastKey, southKey, westKey) {
		this.controlKeyForNorth = northKey;
		this.controlKeyForEast = eastKey;
		this.controlKeyForSouth = southKey;
		this.controlKeyForWest = westKey;
	}

	this.init = function(pic, name) {
		this.bitmap = pic;
		this.myName = name;
		this.reset();
	}

	this.draw = function () {
		drawBitmapCenteredAtLocationWithRotation(this.bitmap, this.x, this.y, 0);
	}

	this.reset = function() {
		this.numKeysHeld = 0;

		if (this.homeX == undefined) {
			for (var i = 0; i < roomGrid.length; ++i) {
				if (roomGrid[i] == TILE.PLAYER) {
					var tileRow = Math.floor(i/ROOM_COLS);
					var tileCol = i % ROOM_COLS;
					roomGrid[i] = TILE.FLOOR;
					this.homeX = (tileCol + 0.5) * TILE_W;
					this.homeY = (tileRow + 0.8) * TILE_H;
					break;
				}
			}	
		}
		this.x = this.homeX;
		this.y = this.homeY;
	}

	this.move = function () {
		var nextX = this.x;
		var nextY = this.y;

		if (this.keyHeld_North) {
			nextY -= PLAYER_MOVE_SPEED;
		}

		if (this.keyHeld_East) {
			nextX += PLAYER_MOVE_SPEED;
		}

		if (this.keyHeld_South) {
			nextY += PLAYER_MOVE_SPEED;
		}

		if (this.keyHeld_West) {
			nextX -= PLAYER_MOVE_SPEED;
		}


		nextTileIndex = getTileIndexAtPixelCoord(nextX, nextY);
		if (nextTileIndex != undefined) {
			nextTileType = roomGrid[nextTileIndex];
		} else {
			nextTileType = TILE.WALL;
		}

		switch(nextTileType) {
			case TILE.FLOOR:
				this.x = nextX;
				this.y = nextY;
				break;
			case TILE.GOAL:
				this.reset();
				break;
			case TILE.DOOR:
				if (this.numKeysHeld > 0) {
					--this.numKeysHeld;
					roomGrid[nextTileIndex] = TILE.FLOOR;
				}
				break;
			case TILE.KEY:
				++this.numKeysHeld;
				roomGrid[nextTileIndex] = TILE.FLOOR;
				break;
			case TILE.WALL:
			default:
				break;

		}
	}
}
var picsToLoad;
var playerPic = document.createElement("img");
var tilePics = [];


function loadImageForTileCode(tileCode, fileName) {
	tilePics[tileCode] = document.createElement("img");
	beginLoadingImage(tilePics[tileCode], fileName);
}


function countLoadedImageAndLaunchIfReady() {
	--picsToLoad;
	if (picsToLoad == 0) {
		startGame();
	}
}

function beginLoadingImage(pic, source) {
	pic.onload = countLoadedImageAndLaunchIfReady();
	pic.src = "images/" + source;
}

function loadImages() {
	var imageList = [
		{varName: playerPic, fileName: "knight.png"},

		{tileType: TILE.FLOOR, fileName: "floor.png"},
		{tileType: TILE.WALL, fileName: "brick_wall.png"},
		{tileType: TILE.GOAL, fileName: "trophy.png"},
		{tileType: TILE.KEY, fileName: "key.png"},
		{tileType: TILE.DOOR, fileName: "door.png"}
	];

	picsToLoad = imageList.length;

	for (var i = 0; i < imageList.length; ++i) {
		if (imageList[i].tileType != undefined) {
			loadImageForTileCode(imageList[i].tileType, imageList[i].fileName);
		} else {
			beginLoadingImage(imageList[i].varName, imageList[i].fileName);
		}
	}
}

var picsToLoad = 3;
var carPic = document.createElement("img");
var trackRoadPic = document.createElement("img");
var trackWallPic = document.createElement("img");

function countLoadedImageAndLaunchIfReady() {
	--picsToLoad;
	if (picsToLoad == 0) {
		startGame();
	}
}

function loadImages() {
	carPic.onload = countLoadedImageAndLaunchIfReady();
	carPic.src = "blue_car.png";
	trackWallPic.onload = countLoadedImageAndLaunchIfReady();
	trackWallPic.src = "wall.png";
	trackRoadPic.onload = countLoadedImageAndLaunchIfReady();
	trackRoadPic.src = "road.png";
}

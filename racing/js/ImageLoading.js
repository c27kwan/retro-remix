var picsToLoad;
var carPic = document.createElement("img");
var car2Pic = document.createElement("img");

var trackPics = [];


function loadImageForTrackCode(trackCode, fileName) {
	trackPics[trackCode] = document.createElement("img");
	beginLoadingImage(trackPics[trackCode], fileName);
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
		{varName: carPic, fileName: "blue_car.png"},
		{varName: car2Pic, fileName: "green_car.png"},

		{trackType: TRACK_ENUM.WALL, fileName: "wall.png"},
		{trackType: TRACK_ENUM.ROAD, fileName: "road.png"},
		{trackType: TRACK_ENUM.GOAL, fileName: "goal.png"},
		{trackType: TRACK_ENUM.TREE, fileName: "tree.png"},
		{trackType: TRACK_ENUM.CONE, fileName: "cone.png"}
	];

	picsToLoad = imageList.length;

	for (var i = 0; i < imageList.length; ++i) {
		if (imageList[i].trackType != undefined) {
			loadImageForTrackCode(imageList[i].trackType, imageList[i].fileName);
		} else {
			beginLoadingImage(imageList[i].varName, imageList[i].fileName);
		}
	}
}

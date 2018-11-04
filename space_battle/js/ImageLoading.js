var picsToLoad;
var playerPic = document.createElement("img");

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
		{varName: playerPic, fileName: "letter_a.png"}
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

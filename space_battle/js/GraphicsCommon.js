function drawBitmapCenteredAtLocationWithRotation(graphic, x, y, ang) {
	canvasContext.save(); // allows rollback
	canvasContext.translate(x, y); // point where img goes
	canvasContext.rotate(ang);
	canvasContext.drawImage(graphic, -graphic.width/2,- graphic.height/2);
	canvasContext.restore(); // undos tanslation and rotation
}

function colourRect(topX, topY, boxWidth, boxHeight, colour) {
	canvasContext.fillStyle = colour;
	canvasContext.fillRect(topX, topY, boxWidth, boxHeight);
}

function colourCircle(centerX, centerY, radius, colour) {
	canvasContext.fillStyle = colour;
	canvasContext.beginPath();
	canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
	canvasContext.fill();
}


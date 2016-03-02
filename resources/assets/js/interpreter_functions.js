var adjX = 200; // the adjusted X value of the sprite to support a cartesian coordinate plane
var adjY = 140; // the adjusted Y value of the sprite to support a cartesian coordinate plane
var semaphore = 0;

/*This fu nction takes in a text input from the print block to add to the text area
 located in the console tab
 @param: the text to add */
var addConsoleText = function(text) {
	var textarea = document.getElementById("textArea");
	textarea.innerHTML += text + '&#13;&#10;';
	textarea.scrollTop = textarea.scrollHeight;
};

/*this function is called to highlight each individual block when pressing step to
	step through the code.
	@param: the id of the block to highlight */
var highlightBlock = function(id) {
	workspace.highlightBlock(id);
	highlightPause = true;
};

/*this function is called by the moveSteps block to move the specified sprite in
  the direction it is facing by the specified number of steps.
	@param: the id of the sprite
	@param: the number of pixels to move the sprite */
var moveStep = function(id, steps) {
	var obj = stage.select('#' + id);
	var dir = parseFloat(obj.attr("pointDir"));
	var oppSide = steps * Math.sin(dir); // y diff
	var adjSide = steps * Math.cos(dir); // x diff
	obj.attr({'x': parseInt(obj.attr('x')) + adjSide, 'y':  parseInt(obj.attr('y')) - oppSide});
	/*obj.transform("t" + adjSide + "," + oppSide);
	var boundingBox = obj.getBBox();
	boundingBox.cx += adjSide;
	boundingBox.cy += oppSide;*/
};


/* this function is called by the both the rotateClockwise and rotateCounterClockwise
   blocks to rotate the specified by given rotate value
	@param: the id of the sprite
	@param: the number of degrees to rotate the sprite (negative if counter cloackwise) */
var rotate = function(id, rotateVal) {
		//TODO Should probably change to take Radians, maybe not

	var obj = stage.select('#'+id);
	var objX = parseInt(obj.attr('x')) + parseInt(obj.attr('width')/2);
	var objY = parseInt(obj.attr('y')) + parseInt(obj.attr('height')/2);
	var rotationStyle = obj.attr('rotationStyle');
	var rotationDegree = parseInt(obj.attr('rotationDegree'));
	//var radians = convertToRadians(rotateVal);

	//while(!semaphore){
		//semaphore = 1;
		if(rotationStyle == 'LtoR'){
			if((rotationDegree + rotateVal) % 180 > 90)
			{
				rotateVal = 180;
				rotationDegree = 0;
			}
			else
			{
					obj.attr({'rotationDegree': parseInt(rotationDegree + rotateVal)});
					return;
			}
		}
		else if(rotationStyle == 'NONE')
		{
			return;
		}
		var m;
		if(!obj.matrix)	{
			//m = new Snap.Matrix(Math.cos(radians), Math.sin(radians), Math.sin(radians) * -1, Math.cos(radians), objX, objY);//.translate(0,0);//.translate(objX, objY);
			//m = new Snap.Matrix(1,1,1,1,1,1).add(new Snap.Matrix(1,1,1,1,1,1));
			//m = new Snap.Matrix(Math.cos(radians), Math.sin(radians), Math.sin(radians) * -1, Math.cos(radians), objX, objY);
			m = new Snap.Matrix().rotate(rotateVal, objX, objY);//.translate(objX, objY);
		}
		else {
			//	m = new Snap.Matrix().translate(objX * -1, objY * -1).add(Math.cos(radians), Math.sin(radians), Math.sin(radians) * -1, Math.cos(radians), 0,0).translate(objX, objY);
			m = obj.matrix.rotate(rotateVal, objX, objY);
			//m.translate(objX, objY);
		}

		obj.animate({transform: m }, 250);//, mina.easeinout, function(){
		//	semaphore = 0;
		//});
		obj.attr({'rotationDegree': parseInt(rotationDegree + rotateVal)});
		//pointIn(id, rotateVal, false);
		//obj.transform(m);
		//obj.animate({ transform: 'r' + rotateVal + ',' + objX + ',' + objY }, 250, mina.easein);
		//obj.transform('r' + rotateVal + ',' + objX + ',' + objY);


		/*
		if(forever) {
			obj.animate({transform: m}, 50, function () {
				rotateVal = rotateVal + rotateInc;
				rotateClock(id, rotateVal, rotateInc, forever); // Repeat this animation so it appears infinite.
			});
		}
		else {
			obj.animate({transform: "r" + rotateVal + ',' + objX + ',' + objY}, 50);
		}*/
	//}

};

/* this function is called by the setY block to set the X value of the specified sprite
   to the new value passed int
	@param: the id of the sprite
	@param: the new X value */
var setX = function (id, newVal) {
	var obj = stage.select('#'+id);
	obj.attr({'x': newVal});
};

/* this function is called by the setX block to set the Y value of the specified sprite
   to the new value passed int
	@param: the id of the sprite
	@param: the new Y value */
var setY = function (id, newVal) {
	var obj = stage.select('#'+id);
	obj.attr({'y':  newVal});
};

/* this function is called by the changeX block to change the X value of the specified sprite
   by adding the new value to the old value
	@param: the id of the sprite
	@param: the value to change X by */
var changeX = function (id, changeVal) {
	var obj = stage.select('#'+id);
	obj.attr({'x':  parseInt(obj.attr('x')) + changeVal});
};

/* this function is called by the changeY block to change the Y value of the specified sprite
   by adding the new value to the old value
	@param: the id of the sprite
	@param: the value to change Y by */
var changeY = function (id, changeVal) {
	var obj = stage.select('#'+id);
	obj.attr({'y':  parseInt(obj.attr('y')) + changeVal});
};

/* this function is called by the GotoXY block to change the X and Y value of
   the specified block to the new values given
	@param: the id of the sprite
	@param: the value to change X to
	@param: the value to change Y to*/
var gotoXY = function (id, xVal, yVal) {
	var obj = stage.select('#'+id);
	obj.attr({'x': xVal, 'y':  yVal});
};


/* this function is called by the Go to Mouse block to change the X and Y value of
   the specified block to the current location of the mouse
	@param: the id of the sprite*/
var gotoMouse = function(id){
	var obj = stage.select('#' + id);
	var newX = mouseX;
	var newY = mouseY;
	if(mouseX > maxX){
		newX = maxX;
	}
	else if (mouseX < 0){
		newX = 0;
	}
	if(mouseY > maxY){
		newY = maxY;
	}
	else if(mouseY < 0){
		newY = 0;
	}
	console.log("x: " + newX + ", y:" + newY);
	obj.attr({'x': newX, 'y': newY - 250});
};

/* this function is called by the glideTo block to change the X and Y value of
   the specified block to the new values given over a specified amount of time
	@param: the id of the sprite
	@param: the time to animate the sprite in seconds
	@param: the value to change X to
	@param: the value to change Y to */
var glideTo = function(id, time, x, y) {

	var obj = stage.select('#'+id);
	var objX = parseInt(obj.attr('x'));
	var objY = parseInt(obj.attr('y'));
	var newX = adjX + x;
	var newY = adjY + y;
	//var maxX = stage.node.width.baseVal.value;
	//var maxY = stage.node.height.baseVal.value;
	if(newX == objX && newY == objY)
	{
		return;
	}
	if(newX > maxX)
	{
		newX = maxX;
	}
	if(newY > maxY)
	{
		newY = maxY;
	}
	if(!obj.matrix)
	{
		m = new Snap.Matrix().translate(newX - objX, newY - objY);
	}
	else
	{
		m = new Snap.Matrix().translate(newX - objX, newY - objY).add(obj.matrix);
	}
	//var direction = obj.pointDir.value;
	obj.animate({ transform: m }, (time * 1000), mina.linear, function() {
		obj.attr({'x': newX, 'y':  newY});
		obj.transform(new Snap.Matrix());
		//rotateClock(id, direction);
	});
}

/* this function is called by the If on Edge Bounce block to change the direction
   the specified sprite is facing if it is touching the edge.
	@param: the id of the sprite */
var edgeBounce = function(id){
	var obj = stage.select('#'+id);
	var objX = parseInt(obj.attr('x'));
	var objY = parseInt(obj.attr('y'));
	if(maxX == objX || maxY == objY)
	{
		pointIn(id, obj.pointIn.value + 180, true);
	}
};

/* this function is called by the Point In block to change the point direction attribute
   a sprite and possibly rotate it. This function is also called as a helper method for
	 other functions
	@param: the id of the sprite
	@param: direction to point the sprite
	@param: boolean specifying whether the direction is being set */
var pointIn = function (id, dir, setDirection) {
	var obj = stage.select("#" + id);
	if(obj != null)
	{
		var dirRad = convertToRadians(dir);
		var pointDiffRad = parseFloat(obj.attr("pointDir")) - dirRad;
		var pointDiffDeg = convertToDegrees(pointDiffRad);
		var rotateStyle = obj.attr('rotateStyle');
		if(rotateStyle == 'NONE' || (rotateStyle == 'LtoR' && (dir != 0 || dir != 180)))
			return;
		else
		{
			rotate(id, pointDiffDeg);
			obj.attr("pointDir", dirRad);
				obj.pointDir += dir;
		}
	}
};

/* this function is called by the pointIn block to point the specified sprite
	 in the direction of the mouse
	 @param: the id of the sprite */
var pointTowardsMouse = function(spriteID){
	var spr = stage.select("#" + spriteID);
	var mX = convertToRadians(mouseX);
	var mY = convertToRadians(mouseY);
	var points = calculateSpriteWindowPosition(spr); // Should return a tuple
	var xDif = (mX + convertToRadians(points.x));
	var yDif = (mY + convertToRadians(points.y) - convertToRadians(50));
	var pointDir = Math.atan(yDif/xDif);
	if(pointDir < 0) { // quadrants 2 & 4
		if (xDif < 0) { // quadrant 2
			pointDir += Math.PI;
		}
		else { // quadrant 4
			pointDir += 2 * Math.PI;
		}
	}
	else { // quadrants 1 & 3
		if (xDif < 0 && yDif < 0) { // quadrant 3
			pointDir += Math.PI
		}
		// do nothing for quadrant 1
	}

/*
	switch (true) {
		case(pointDir < 0): // quadrant 2 & 4

			break;
		case (xDif < 0):
			pointDir += Math.PI;
			break;
		case (yDif > 0):
			pointDir += 2 * Math.PI;
			break;
		default: // yDif < 0 and xDif > 0
			// do nothing
	}
*/
	pointIn(spriteID, convertToDegrees(pointDir), true);
};

/* this function is called by the Set Rotation Style Block to set the rotation style
   attribute of the specified sprite
	@param: the id of the sprite
	@param: the specific rotation style given by the list in the block */
var setRotationStyle = function(id, rotateStyle)
{
	var obj = stage.select("#"  + id);
	if(obj != null){
		obj.attr({'rotateStyle': rotateStyle});
	}
}

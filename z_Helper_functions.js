"use strict";

function clearDrawing() {
  dots = [];
}


function getControllerValues() {
  wheelRotationalFreq = Number(guiParams.wheelSpeed) / 100;

  myMarker.frequency = Number(guiParams.markerSpeed) / 100;  //called psychology
  myMarker.strokeSize = Number(guiParams.markerThickness);

  let motionType = guiParams.motionType;
  console.log(motionType);

  let xCenter = Number(guiParams.xCenter) / 100.0 * width;
  let yCenter = Number(guiParams.yCenter) / 100.0 * width;
  let amplitude = Number(guiParams.amplitude);

  generatorShape = new Shape(motionType, xCenter, yCenter, amplitude);
  resetAngle();
}


function resetAngle() {
  anglePerFrame = wheelRotationalFreq * wheelDirection;
  cosAngle = cos(anglePerFrame);
  sinAngle = sin(anglePerFrame);
}


function setControllerValues(motionType, wheelSpeed, markerSpeed, amp, xCenterValue, yCenterValue, ss, wheelDir) {
  guiParams.motionType = motionTypes[motionType];
  guiParams.wheelSpeed = wheelSpeed;
  guiParams.markerSpeed = markerSpeed;
  guiParams.amplitude = amp;
  guiParams.xCenter = xCenterValue;
  guiParams.yCenter = yCenterValue;
  guiParams.markerThickness = ss;

  wheelDirection = wheelDir;
  guiParams.reverseWheel = (wheelDirection === -1);

  updateGUIControllers();
  resetAngle();
}


function getSliderColor() {
  let redAmt = Number(guiParams.red);
  let greenAmt = Number(guiParams.green);
  let blueAmt = Number(guiParams.blue);

  return color(redAmt, greenAmt, blueAmt);
}


function createEdgedots() {
  let theta = 0;
  let angleGapBetweenDots = TWO_PI / numEdgedots;

  for (let i = 0; i < numEdgedots; i++) {
    let x = xC + wheelRadius * cos(theta);
    let y = yC - wheelRadius * sin(theta);
    let dotPos = createVector(x, y);
    edgedots[i] = new Dot(dotPos, center, color(255, 120, 0), 20);
    theta += angleGapBetweenDots;
  }
}


function mouseDragged() {
  if (generatorShape.type === "Mouse" && dist(mouseX, mouseY, center.x, center.y) < wheelRadius) {
    let mouseLoc = createVector(mouseX, mouseY);
    let newcurrDot = new Dot(mouseLoc, center, myMarker.colour, 10);
    dots.push(newcurrDot);
  }
}


function getTime() {
  return month() + "-" + day() + "-" + hour() + ":" + minute();
}

"use strict";

//DECLARING THE OBJECTS
let generatorShape;   //The shape used to generate the curve. Can be "line", "circle", "square", etc.
let myMarker;         //Purple marker
let dots;             //The list of dots that comprise the current curve
let edgedots;         //The orange dots that spin on the outside of the wheel
let tolerance = 10;

//OTHER GLOBAL VARIABLES
let wheelRotationalFreq;  //How fast the wheel spins
let numEdgedots = 8;
let center;               //The center of the screen
let xC, yC;               //Also the center of the screen
let paused = false;
let mouseDown = false;
let showShape = true;
let t = 0;                //Time since the program started running
let wheelRadius;
let wheelDirection = 1;   //1 = clockwise, -1 = counterclockwise
let diameter;
let anglePerFrame, cosAngle, sinAngle;
let screenshotNum = 1;    //Number label given to screenshot images as the user makes them
let THREE_HALVES_PI = 3 * Math.PI / 2;


//MAIN PROCEDURE
function setup() {
  createCanvas(600, 600);
  background(0);
  noStroke();
  splineProperty("ends", EXCLUDE);

  xC = width / 2;
  yC = height / 2;

  center = createVector(xC, yC);
  wheelRadius = width / 2.05;
  diameter = 2 * wheelRadius;

  myMarker = new Marker(color(120, 0, 255));

  createGUI();
  getControllerValues();  //Reads all values from the controls

  dots = [];
  edgedots = new Array(numEdgedots);
  createEdgedots();
}


//DRAWING PROCEDURE
function draw() {
  if (paused === false) {

    //Draws the main wheel
    background(0);
    fill(255);
    noStroke();

    //Draws the main wheel
    circle(xC, yC, diameter);

    //Draws the generator shape (pretzel, figure 8, square, etc.)
    if (guiParams.showGenerator)
      generatorShape.drawMe();

    //Draws the curve created so far

    strokeWeight(myMarker.strokeSize);
    let n = dots.length;

    if (generatorShape.type === "Mouse") {
      for (let d of dots)
        d.drawMe();
    }

    else {  //Draws a short curve between every pair of consecutive dots in the arraylist, as long as there's at least 4 points so far
      if (n >= 4) {
        for (let i = 0; i < dots.length - 3; i++) {
          let dA = dots[i];
          let dB = dots[i + 1];
          let dC = dots[i + 2];
          let dD = dots[i + 3];

          fill(dB.col);
          stroke(dB.col);

          if (dB.onScreen && dC.onScreen)
            spline(
              dA.location.x, dA.location.y,
              dB.location.x, dB.location.y,
              dC.location.x, dC.location.y,
              dD.location.x, dD.location.y
            );
        }
      }
    }

    //Rotates every dot in the drawing so far, in prep for the next frame
    for (let d of dots)
      d.rotate();

    //Draws and rotates the orange edge dots along the edge of the wheel
    for (let i = 0; i < numEdgedots; i++) {
      edgedots[i].drawMe();
      edgedots[i].rotate();
    }

    //Moves the marker
    myMarker.updatePosition();

    //Creates a new dot where the marker currently is and adds it to the list of dots to be drawn next frame
    let newDot;

    if (generatorShape.type !== "Mouse") {
      newDot = new Dot(myMarker.pos, center, getSliderColor(), 5);
      dots.push(newDot);
    }

    //Draws the marker. This happens last because we want the dot to show up on top of the curve
    myMarker.drawMe();

    t += 1; //INCREMENTS THE GLOBAL TIMER
  }
}

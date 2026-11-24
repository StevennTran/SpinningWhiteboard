"use strict";

class Shape {
  constructor(type, xC, yC, amp) {
    this.type = type; //"Line", "Circle", "Square", "Figure 8", "Pretzel"
    this.center = createVector(xC, yC); 
    this.amplitude = amp; 
    this.diameter = 2 * amp;
    this.squareSpeed = 2 * amp / (Math.PI / 2);
  }


  drawMe() {
    noFill();
    stroke(128);
    strokeWeight(2);

    //CIRCLE
    if (this.type === "Circle") { 
      circle(this.center.x, this.center.y, this.diameter);
    } 

    //SQUARE
    else if (this.type === "Square") {
      square(this.center.x - this.amplitude, this.center.y - this.amplitude, this.diameter);
    } 

    //LINE 
    else if (this.type === "Line") {
      let xLeft = this.center.x - this.amplitude;
      let xRight = this.center.x + this.amplitude;
      line(xLeft, this.center.y, xRight, this.center.y);
    }

    else if (this.type === "Mouse") {
      return;
    }

    //FIGURE 8 or PRETZEL
    else {
      let currPoint;
      let xPrev = 0, yPrev = 0;
      let x, y;

      for (let theta = 0; theta <= 2 * Math.PI + 0.01; theta += 0.01) {
        currPoint = this.getPoint(theta);
        x = currPoint.x;
        y = currPoint.y;

        if (theta > 0) 
          line(x, y, xPrev, yPrev);  //draws a very short line between 2 consecutive points on the curve

        xPrev = x;
        yPrev = y;
      }
    }
  }


  //RETURNS A POINT ALONG THE SHAPE AT A GIVEN ANGLE THETA.
  //USED FOR DRAWING THE PRETZEL-LIKE SHAPES, AND ALSO FOR PLACING THE MARKER AT THE RIGHT PLACE ALONG THE SHAPE
  getPoint(theta) { 
    let x = 0, y = 0;
    let A = this.amplitude;

    if (this.type === "Line") {
      x = this.center.x + A * cos(theta);
      y = this.center.y;
    } 

    else if (this.type === "Circle") { 
      x = this.center.x + A * cos(theta);
      y = this.center.y + A * sin(theta);
    } 

    else if (this.type === "Figure 8") { 
      x = this.center.x + A * sin(2 * theta);
      y = this.center.y + A * sin(theta);
    } 

    else if (this.type === "Pretzel") { 
      x = this.center.x + A * sin(4 * theta); 
      y = this.center.y + A * sin(3 * theta);
    } 

    else if (this.type === "Square") { 
      let t2 = theta % (2 * Math.PI);   //MEASURES PROGRESS AROUND THE WHOLE SQUARE (t2=0 --> start, t2=TWO_PI --> finish)
      let t3 = theta % (Math.PI / 2);  //MEASURES PROGRESS ALONG THE CURRENT SIDE THAT THE MARKER IS TRAVERSING
      let progressAlongEdge = this.squareSpeed * t3;

      if (t2 <= Math.PI / 2) {   //1ST EDGE OF THE SQUARE
        x = this.center.x + A;
        y = this.center.y + A - progressAlongEdge; //MOVING UPWARDS ALONG THE RIGHT EDGE
      }

      else if (t2 <= Math.PI) {   //2ND EDGE OF THE SQUARE
        x = this.center.x + A - progressAlongEdge; //MOVING LEFT ALONG THE TOP EDGE
        y = this.center.y - A;
      } 

      else if (t2 <= THREE_HALVES_PI) {  //3RD EDGE OF THE SQUARE
        x = this.center.x - A;
        y = this.center.y - A + progressAlongEdge; //MOVING DOWN ALONG THE LEFT EDGE
      } 

      else if (t2 <= 2 * Math.PI) {  //4TH EDGE OF THE SQUARE
        x = this.center.x - A + progressAlongEdge; //MOVING RIGHT ALONG THE BOTTOM EDGE
        y = this.center.y + A;
      }
    } 

    return createVector(x, y);
  }
}

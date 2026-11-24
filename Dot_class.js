"use strict";

class Dot {
  //CONSTRUCTOR #1 / CONSTRUCTOR #2
  constructor(p, c, col = null, size = 0) {    
    this.location = createVector(p.x, p.y);
    this.center = createVector(c.x, c.y);
    this.minusCenter = createVector(-this.center.x, -this.center.y);
    this.distFromCenter = dist(c.x, c.y, p.x, p.y);

    if (col === null) {
      if (this.distFromCenter < wheelRadius)
        this.onScreen = true;
      else
        this.onScreen = false;

      this.col = color(0, 0, 255);
      this.size = size;
    }

    else {
      if (this.distFromCenter <= 1.01 * wheelRadius)
        this.onScreen = true;
      else
        this.onScreen = false;

      this.col = col;
      this.size = size;
    }
  }


  rotate() {
    let v = this.location.add(this.minusCenter); //TRANSLATE THE CENTER OF THE WHEEL TO THE ORIGIN TO MAKE THE MATHEMATICS OF ROTATION SIMPLER
    let vRotated = createVector(v.x * cosAngle + v.y * sinAngle, -v.x * sinAngle + v.y * cosAngle);  //ROTATE THE DOT ABOUT THE ORIGIN
    this.location = vRotated.add(this.center);  //TRANSLATE THE ROTATED DOT BACK TO ITS ORIGINAL CENTER
  }


  drawMe() {
    if (this.onScreen) {
      fill(this.col);
      noStroke();
      circle(this.location.x, this.location.y, this.size);
    }
  }
}

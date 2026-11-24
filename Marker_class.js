"use strict";

class Marker {
  constructor(col) {
    this.pos = createVector(0, 0);
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.distFromCenter = 0;
    this.frequency = 0;
    this.colour = col;
    this.strokeSize = 2;
  }


  updatePosition() { 
    if (generatorShape.type === "Mouse") {
      this.pos = createVector(mouseX, mouseY);
    }
    else {
      let theta = this.frequency * t;
      this.pos = generatorShape.getPoint(theta);
    }

    this.distFromCenter = this.pos.dist(center);
  }  


  drawMe() {
    fill(this.colour);
    stroke(0);
    circle(this.pos.x, this.pos.y, 12);
  }
}

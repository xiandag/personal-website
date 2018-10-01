function Ball(tempX, tempY, tempW) {
  this.x = tempX; // x location of square 
  this.y = tempY; // y location of square 
  this.w = tempW; // speed of square 
  this.speed = 0; // size

  this.display = function(col) {
    // Display the square 
    fill(col, random(52, 73), 95);
    noStroke();
    ellipse(this.x-2, this.y-2, this.w+7+noise(this.w)*5, this.w+15+noise(this.w)*5);
    ellipse(this.x+9, this.y+1, this.w+8, this.w+8);
    ellipse(this.x+17, this.y+2, this.w+5, this.w+5);
    ellipse(this.x-10, this.y+2, this.w+7, this.w+7);
  };

  this.update = function(cdrag) {
    // Add speed to location
    this.y = this.y + this.speed;

    // Add gravity to speed
    this.speed = this.speed + gravity;

    var dragMagnitude = cdrag * this.speed * this.speed*0.5;

    this.speed = this.speed - this.speed*dragMagnitude;

    // If square reaches the bottom 
    // Reverse speed 
    if (this.y > 0.75*height - this.w/2) {
      this.speed = this.speed * -0.75;
      //if (abs(this.speed) < 1) {
      //  this.speed = 0;
      //}
    }
  };
}

function Liquid(x, y, w, h) {
  this.x = x; // x location of square 
  this.y = y; // y location of square 
  this.w = w; // speed of square 
  this.h = h; // size

  this.display = function() {
    noStroke();
    fill(224, 97, 99, 90);
    rect(x, y, w, h);
    //tint(255, 126);
    //image(img, liquid.x, liquid.y, 0);
  };
}

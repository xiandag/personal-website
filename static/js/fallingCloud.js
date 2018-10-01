var balls = [];
var gravity = 0.1;
var liquid;
var img;
// function preload() {
//   img = loadImage('blue-water.jpg');
// }

function setup() {
  createCanvas(960, 549);
  liquid = new Liquid(width/4, height/4, width/2, height/2);
  for (var i = 0; i < 1; i++) {
    balls.push(new Ball(width/2-random(-width/4, width/4), 0, random(17, 32)));
  }
  
  
}

function draw() {
  // var p0 = color(244, 113, 205);
  // var p1 = color(253, 153, 151);
  // var b1 = color(4, 68, 255);
  // var b2 = color(23, 16, 253);
  background(255);
  colorMode(HSB, 360, 100, 100, 100);

  liquid.display();
  
  for (var j = 0; j < balls.length; j++) {

    balls[j].display(224);
    if (balls[j].y >=liquid.y && balls[j].x > liquid.x 
      && balls[j].x < liquid.x+liquid.w) {
      balls[j].display(323);
    }
    balls[j].update(0);
    if (balls[j].y >=liquid.y && balls[j].x > liquid.x 
      && balls[j].x < liquid.x+liquid.w) {
      balls[j].update(0.1);
    }
  }
  
  
}

function mouseClicked() {
  var ballnew = new Ball(mouseX, 0, random(17, 32));
  append(balls, ballnew);
}

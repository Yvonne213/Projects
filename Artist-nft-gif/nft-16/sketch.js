let noiseMax = 2;
let zoff = 0;
let p5Canvas;
let chasingPoint;
let easing = 0.08;
let position;
let velocity;
let sizeFactor = 1;

P5Capture.setDefaultOptions({
  format: "gif",
  quality: 0.92,
  disableScaling: true,
  autoSaveDuration: 30,
})

function setup() {
  p5Canvas = createCanvas(1000, 1000);
  chasingPoint = createVector(0, 0);
  position = createVector(width / 2, height / 2);
  velocity = createVector(random(-2, 2), random(-2, 2));
  frameRate(30);
}

function draw() {

  // if (frameCount === 1) {
  //   const capture = P5Capture.getInstance();
  //   capture.start({
  //     format: "gif",
  //     duration: 600,
  //   });
  // }

  background(255);

  // Update position and check for boundary collisions
  position.add(velocity);

  let shapeBoundary = calculateShapeBoundary();

  if (position.x + shapeBoundary.minX <= 0 || position.x + shapeBoundary.maxX >= width) {
    velocity.x *= -1;
    sizeFactor = random(0.5, 1.5);
  }
  if (position.y + shapeBoundary.minY <= 0 || position.y + shapeBoundary.maxY >= height) {
    velocity.y *= -1;
    sizeFactor = random(0.5, 1.5);
  }

  position.x = constrain(position.x, -shapeBoundary.minX, width - shapeBoundary.maxX);
  position.y = constrain(position.y, -shapeBoundary.minY, height - shapeBoundary.maxY);

  drawShape();
}

function calculateShapeBoundary() {
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  for (let a = 0; a < TWO_PI; a += 0.01) {
    let xoff = map(cos(a), -1, 1, 0, noiseMax);
    let yoff = map(sin(a), -1, 1, 0, noiseMax);
    let r = sizeFactor * map(noise(xoff, yoff, zoff), 0, 1, width / 3, width / 2.5);

    let x = r * cos(a);
    let y = r * sin(a);

    minX = min(minX, x);
    maxX = max(maxX, x);
    minY = min(minY, y);
    maxY = max(maxY, y);
  }

  return { minX, maxX, minY, maxY };
}

function drawShape() {
  push();
  translate(position.x, position.y);
  stroke(255, 0, 0, 50);
  strokeWeight(4);
  noFill();
  beginShape();
  for (let a = 0; a < TWO_PI; a += 0.01) {
    let xoff = map(cos(a), -1, 1, 0, noiseMax);
    let yoff = map(sin(a), -1, 1, 0, noiseMax);
    let r = sizeFactor * map(noise(xoff, yoff, zoff), 0, 1, width / 3, width / 2.5);

    let x = r * cos(a);
    let y = r * sin(a);

    vertex(x, y);
  }
  endShape(CLOSE);

  zoff += 0.05;
  pop();

  
  push();
  textSize(25);
  fill(255, 0, 0, 150)
  text('Welcome to the circle!', width / 2, 920);

  pop();

  textAlign(CENTER, CENTER);
  push();
  textSize(45);
  text('The person who allows themselves to', width / 2, height / 2.5 + 50);
  text('fail again and again is an artist.', width / 2, height / 2.1 + 50);
  textSize(20);
  textStyle(ITALIC);
  text('--Artist Manifesto', width / 2, height / 1.8 + 50);
  fill(0, 0, 0);
  pop();
}



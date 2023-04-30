let noiseMax = 2
let phase = 0
let zoff = 0
var xoff1 = 0
var xoff2 = 10000
let p5Canvas;
let chasingPoint;
let easing = 0.01;


P5Capture.setDefaultOptions({
  format: "gif",
  quality: 0.92,
  disableScaling: true,
  autoSaveDuration: 30,
})

function setup() {
  p5Canvas = createCanvas(1000, 1000);
  chasingPoint = createVector(0, 0);
  frameRate(30);
}

function draw() {
  // if (frameCount === 1) {
  //   const capture = P5Capture.getInstance();
  //   capture.start({
  //     format: "gif",
  //     duration: 300,
  //   });
  // }

  background(255);
  push();
  translate(width / 2, height / 2)
  stroke(255, 0, 0, 45)
  strokeWeight(4)
  noFill()
  beginShape()
  for (let a = 0; a < TWO_PI; a += 0.01) {
    let xoff = map(cos(a), -1, 1, 0, noiseMax)
    let yoff = map(sin(a), -1, 1, 0, noiseMax)
    let r = map(noise(xoff, yoff, zoff), 0, 1, width /3.4, width / 2.4)

    let x = r * cos(a)
    let y = r * sin(a)

    // vertex(x-50, y)
vertex(x,y)
    fill(255,0,0,40)
  }



  endShape(CLOSE)

  beginShape()
  for (let a = 0; a < TWO_PI; a += 0.01) {
    let xoff = map(cos(a), -1, 1, 0, noiseMax)
    let yoff = map(sin(a), -1, 1, 0, noiseMax)
    let r = map(noise(xoff, yoff, zoff), 0, 1, width /3.2, width /3.2)

    let x = r * cos(a)
    let y = r * sin(a)

    // vertex(x-50, y)
vertex(x,y)
    fill(255)
  }
  endShape(CLOSE)



  zoff += 0.05
  pop();

  if (mouseIsPressed === true) {
    noiseMax = 10
  } else {
    noiseMax = 10
  }



let a=50;
let b=0;
  textAlign(CENTER, CENTER);
  push();
  textSize(45);
  text('The person who creates', width / 2+b, height / 2.7 + a);
  text('spontaneously instead of', width / 2+b, height / 2.3 + a);
  text('following the trends', width / 2+b, height / 2.0 + a);
  text('is an artist.', width / 2+b, height / 1.8 + a);
  textSize(20);
  textStyle(ITALIC);
  text('--Artist Manifesto', width / 2+b, height / 1.6+ 50);
  fill(0, 0, 0);
  pop();

  push();
  textSize(25);
  fill(255, 0, 0, 200)
  text('Welcome to the circle!', width / 2, 920);
  pop();

}





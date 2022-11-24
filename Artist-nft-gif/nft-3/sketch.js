let noiseMax = 2
let phase = 0
let zoff = 0
var xoff1 = 0
var xoff2 = 10000
let p5Canvas;
let chasingPoint;
let easing = 0.08;


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
  // create gif ---------
  // if (frameCount ===1) {
  //   const capture = P5Capture.getInstance();
  //   capture.start({
  //     format: "gif",
    
  //     duration: 300,
  //   });
  // }
 // created gif ---------

  background(255);
  push();
  translate(width / 2, height / 2)
  stroke(255, 0, 0, 40)
  strokeWeight(4)
  noFill()
  beginShape()
  for (let a = 0; a < TWO_PI; a += 0.01) {
    let xoff = map(cos(a), -1, 1, 0, noiseMax)
    let yoff = map(sin(a), -1, 1, 0, noiseMax)
    let r = map(noise(xoff, yoff, zoff), 0, 1, width /2.8, width / 2.4)

    let x = r * cos(a)
    let y = r * sin(a)

    vertex(x, y-500)



    let targetPoint = createVector(x, y)
    let angle = atan2(targetPoint.y - chasingPoint.y, targetPoint.x - chasingPoint.x)
    chasingPoint = p5.Vector.lerp(chasingPoint, targetPoint, easing)

    push();
    translate(chasingPoint.x, chasingPoint.y);
    rotate(angle)
    vertex(0, 0-500);
    fill("#FFC107")
    strokeWeight(3)
    pop();
  }
  endShape(CLOSE)

 push();
 stroke(255, 0, 0, 100)
 strokeWeight(4)
    beginShape()
    for (let a=0;a < TWO_PI; a+=0.01){
      let xoff = map(cos(a), -1,1,0,noiseMax)
      let yoff = map(sin(a), -1,1,0,noiseMax)

         let r2 = map(noise(xoff,yoff,zoff),0,1,width/2.8,width/2.4)
         let x2 = r2*cos(a)
      let y2 = r2*sin(a)
       vertex(x2,y2+530)

    }
    endShape(CLOSE)
    //  beginShape()
    // for (let a=0;a < TWO_PI; a+=0.01){
    //   let xoff = map(cos(a), -1,1,0,noiseMax)
    //   let yoff = map(sin(a), -1,1,0,noiseMax)

    //      let r2 = map(noise(xoff,yoff,zoff),0,1,width/2,width/2.3)
    //      let x2 = r2*cos(a)
    //   let y2 = r2*sin(a)
    //    vertex(x2,y2+180)

    // }
    // endShape(CLOSE)
pop();

  zoff += 0.05
  pop();

  //    push();
  //   var x= map(noise(xoff1), 0, 1,0, width);
  //   var y= map(noise(xoff2), 0, 1, 0, height);
  //   xoff1 +=0.005
  //   xoff2 +=0.005
  //   fill("red")
  //   strokeWeight(4)
  //   stroke("#F8968F")
  // textSize(20);
  // text('Artist', x, y);
  //   pop();
  if (mouseIsPressed === true) {
    noiseMax = 10
  } else {
    noiseMax = 10
  }

  push();
textSize(25);
fill(255,0,0,150)
text('Welcome to the circle!', width/2, 920);

pop();

textAlign(CENTER, CENTER);
push();
textSize(45);
text('The person who has names', width/2, height/2.5+40);
text('and surnames is an artist.', width/2, height/2.1+40);
textSize(20);
textStyle(ITALIC);
text('--Artist Manifesto', width/2, height/1.8+40);
fill(0, 0, 0);
pop();
  
// push();
// noFill();
// stroke(255,0,0);
// strokeWeight(3);
// circle(width/2, height/2, 780);
// pop();

}



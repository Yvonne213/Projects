let x = 0;
let y = 0;
let radius = 0;
let noiseScale = 0.02;
let t = 0;

P5Capture.setDefaultOptions({
  format: "gif",
  quality: 0.92,
  disableScaling: true,
  autoSaveDuration: 30,
})

function setup() {
  createCanvas(1000,1000);
  background(255);
}

function draw() {
    if (frameCount === 1) {
    const capture = P5Capture.getInstance();
    capture.start({
      format: "gif",
      duration: 600,
    });
  }
  background(255);
  // Add some noise to the circle's radius and position
  push();
  let noiseVal = noise(t);
  radius = map(noiseVal, 0, 1, 50, 300)
  let targetX = width/2 + map(noise(t+10), 0, 1, -100,100)
  let targetY = height/2 + map(noise(t+20), 0, 1, -100,100);
  

  x = lerp(x, targetX, 0.1);
  y = lerp(y, targetY, 0.1);
  // Draw the circle
  noFill();
  stroke(255,0,0);
  strokeWeight(2);
  ellipse(x, y, radius, radius);
  
  // Increment the time variable
  t += noiseScale;
  pop();
  
  push();
  textSize(25);
  fill(255, 0, 0, 150)
  text('Welcome to the circle!', width / 2, 920);

  pop();

  textAlign(CENTER, CENTER);
  push();
  textSize(45);
  text('The person who sees money games', width / 2, height / 2.5 + 50);
  text('as creations is an artist.', width / 2, height / 2.1 + 50);
  textSize(20);
  textStyle(ITALIC);
  text('--Artist Manifesto', width / 2, height / 1.8 + 50);
  fill(0, 0, 0);
  pop();
}


